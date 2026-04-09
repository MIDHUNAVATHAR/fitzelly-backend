import { IAnalyticsRepository, GymAnalyticsData, DashboardData } from "../../domain/repositories/IAnalyticsRepository";
import { PaymentModel } from "../database/mongoose/models/PaymentModel";
import { Types } from "mongoose";
import { MembershipModel } from "../database/mongoose/models/MembershipModel";
import { clientModel as ClientModel } from "../database/mongoose/models/ClientModel";
import { AttendanceModel } from "../database/mongoose/models/AttendanceModel";
import { TrainerModel } from "../database/mongoose/models/TrainerModel";
import { GymModel } from "../database/mongoose/models/GymModel";
import { SubscriptionModel } from "../database/mongoose/models/SubscriptionModel";
import { SuperAdminDashboardData } from "../../domain/repositories/IAnalyticsRepository";

export class AnalyticsRepository implements IAnalyticsRepository {
    async getGymAnalytics(gymId: string): Promise<GymAnalyticsData> {
        const currentDate = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);


        const [
            monthlyRevResult,
            membershipsWithPayments,
            clientRetention
        ] = await Promise.all([
            // MONTHLY REVENUE
            PaymentModel.aggregate([
                {
                    $match: {
                        isDeleted: false,
                        paymentDate: { $gte: sixMonthsAgo },
                        membershipId: { $type: "string", $regex: /^[a-fA-F0-9]{24}$/ }
                    }
                },
                { $addFields: { membershipObjectId: { $toObjectId: "$membershipId" } } },
                { $lookup: { from: "memberships", localField: "membershipObjectId", foreignField: "_id", as: "membership" } },
                { $unwind: "$membership" },
                { $match: { "membership.gymId": gymId, "membership.isDeleted": false } },
                {
                    $group: {
                        _id: { month: { $month: "$paymentDate" }, year: { $year: "$paymentDate" } },
                        revenue: { $sum: "$amount" }
                    }
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } }
            ]),

            // ALL ACTIVE MEMBERSHIPS FOR PLAN SHARE AND PENDING/PAID
            MembershipModel.aggregate([
                { $match: { gymId: gymId, isDeleted: false, status: "ACTIVE", expiryDate: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } } },
                { $addFields: { membershipStringId: { $toString: "$_id" } } },
                { $lookup: { from: "payments", localField: "membershipStringId", foreignField: "membershipId", as: "payments" } },
                {
                    $addFields: {
                        totalPaid: {
                            $sum: {
                                $map: {
                                    input: { $filter: { input: "$payments", as: "p", cond: { $eq: ["$$p.isDeleted", false] } } },
                                    as: "payment",
                                    in: "$$payment.amount"
                                }
                            }
                        }
                    }
                },
                { $project: { planName: 1, planAmount: 1, totalPaid: 1 } }
            ]),

            // CLIENT RETENTION
            ClientModel.aggregate([
                { $match: { gymId: gymId, isDeleted: false } },
                {
                    $lookup: {
                        from: "memberships",
                        let: { client_id: { $toString: "$_id" } },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$clientId", "$$client_id"] }, isDeleted: false, status: "ACTIVE" } }
                        ],
                        as: "activeMemberships"
                    }
                },
                {
                    $project: {
                        isActive: { $gt: [{ $size: "$activeMemberships" }, 0] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalClients: { $sum: 1 },
                        activeClients: { $sum: { $cond: ["$isActive", 1, 0] } },
                        inactiveClients: { $sum: { $cond: ["$isActive", 0, 1] } }
                    }
                }
            ])
        ]);

        // Process Monthly Revenue
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyRevenue = monthlyRevResult.map((item: { _id: { month: number; year: number }; revenue: number }) => ({
            month: `${monthNames[item._id.month - 1]} ${item._id.year.toString().slice(-2)}`,
            revenue: item.revenue
        }));

        // Process Plan Revenue & Payment Status
        const planRevenueMap = new Map<string, number>();
        let totalExpected = 0;
        let totalPaid = 0;

        for (const membership of membershipsWithPayments) {
            totalExpected += membership.planAmount || 0;
            totalPaid += membership.totalPaid || 0;

            const currentPlanRev = planRevenueMap.get(membership.planName) || 0;
            planRevenueMap.set(membership.planName, currentPlanRev + (membership.totalPaid || 0));
        }

        const planRevenue = Array.from(planRevenueMap.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // top 5 plans

        const pendingAmount = Math.max(0, totalExpected - totalPaid);
        const paymentStatus: { status: 'Paid' | 'Pending', value: number }[] = [
            { status: 'Paid', value: totalPaid },
            { status: 'Pending', value: pendingAmount }
        ];

        const retention = clientRetention[0] || { totalClients: 0, activeClients: 0, inactiveClients: 0 };

        return {
            monthlyRevenue,
            planRevenue,
            paymentStatus,
            retention: {
                totalClients: retention.totalClients,
                activeClients: retention.activeClients,
                inactiveClients: retention.inactiveClients
            }
        };
    }

    async getGymDashboardData(gymId: string): Promise<DashboardData> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // REAL-TIME STATS
        const [todayCheckins, monthRevenue, monthJoinees] = await Promise.all([
            //  Today's Checkins
            AttendanceModel.aggregate([
                { $match: { gymId, date: today, isDeleted: false } },
                {
                    $group: {
                        _id: "$userType",
                        count: { $sum: 1 }
                    }
                }
            ]),
            //  This Month's Revenue
            PaymentModel.aggregate([
                {
                    $match: {
                        isDeleted: false,
                        paymentDate: { $gte: startOfMonth },
                        membershipId: { $type: "string", $regex: /^[a-fA-F0-9]{24}$/ }
                    }
                },
                { $addFields: { membershipObjectId: { $toObjectId: "$membershipId" } } },
                { $lookup: { from: "memberships", localField: "membershipObjectId", foreignField: "_id", as: "membership" } },
                { $unwind: "$membership" },
                { $match: { "membership.gymId": gymId, "membership.isDeleted": false } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            //  This Month's Joinees
            ClientModel.countDocuments({ gymId, joinedDate: { $gte: startOfMonth }, isDeleted: false })
        ]);

        const checkinMap = { CLIENT: 0, TRAINER: 0 };
        todayCheckins.forEach((item: { _id: string; count: number }) => {
            if (item._id === 'CLIENT' || item._id === 'TRAINER') {
                checkinMap[item._id as 'CLIENT' | 'TRAINER'] = item.count;
            }
        });

        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const next7Days = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000);

        // EXTRA STATS (Formerly cached, now calculated live)
        const [birthdaysClient, birthdaysTrainer, expiries, activeClients] = await Promise.all([
            // Birthdays (Clients)
            ClientModel.aggregate([
                { $match: { gymId, isDeleted: false, dateOfBirth: { $exists: true, $ne: null } } },
                {
                    $project: {
                        name: "$fullName",
                        month: { $month: "$dateOfBirth" },
                        day: { $dayOfMonth: "$dateOfBirth" }
                    }
                },
                { $match: { month: currentMonth, day: currentDay } }
            ]),
            // Birthdays (Trainers)
            TrainerModel.aggregate([
                { $match: { gymId: new Types.ObjectId(gymId), isDeleted: false, dateOfBirth: { $exists: true, $ne: null } } },
                {
                    $project: {
                        name: "$fullName",
                        month: { $month: "$dateOfBirth" },
                        day: { $dayOfMonth: "$dateOfBirth" }
                    }
                },
                { $match: { month: currentMonth, day: currentDay } }
            ]),
            // Expiries (Next 7 days)
            MembershipModel.find({
                gymId,
                isDeleted: false,
                status: 'ACTIVE',
                expiryDate: { $gte: startOfToday, $lte: next7Days }
            }).sort({ expiryDate: 1 }).limit(10),
            // Potential Inactive Clients
            MembershipModel.find({
                gymId,
                isDeleted: false,
                status: 'ACTIVE',
                expiryDate: { $gte: startOfToday }
            }).select('clientId clientName')
        ]);

        // Inactive Clients calculation (7+ days since last presence)
        const inactiveClientsData = [];
        for (const m of activeClients) {
            const lastAttendance = await AttendanceModel.findOne({
                userId: m.clientId,
                gymId,
                isDeleted: false
            }).sort({ date: -1 });

            const lastSeenDate = lastAttendance?.date || null;
            let daysSince = 999;

            if (lastSeenDate) {
                daysSince = Math.floor((startOfToday.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60 * 24));
            }

            if (daysSince >= 7) {
                inactiveClientsData.push({
                    clientId: m.clientId,
                    name: m.clientName,
                    lastCheckIn: lastSeenDate,
                    daysSinceLastSeen: daysSince
                });
            }
        }

        const birthdays = [
            ...birthdaysClient.map(b => ({ userId: b._id.toString(), name: b.name, role: 'CLIENT' as const })),
            ...birthdaysTrainer.map(b => ({ userId: b._id.toString(), name: b.name, role: 'TRAINER' as const }))
        ];

        const upcomingExpiries = expiries.map(e => ({
            clientId: e.clientId,
            name: e.clientName,
            expiryDate: e.expiryDate as Date,
            daysRemaining: Math.ceil((new Date(e.expiryDate as Date).getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24))
        }));

        const finalInactiveClients = inactiveClientsData.sort((a, b) => b.daysSinceLastSeen - a.daysSinceLastSeen).slice(0, 10);

        return {
            todayCheckins: { client: checkinMap.CLIENT, trainer: checkinMap.TRAINER },
            monthRevenue: monthRevenue[0]?.total || 0,
            monthJoinees,
            expiries: upcomingExpiries,
            birthdays: birthdays,
            inactiveClients: finalInactiveClients
        };
    }

    async getSuperAdminDashboardData(): Promise<SuperAdminDashboardData> {
        const [totalGyms, activeGyms, pendingGyms, totalRevenueRes, revenueTrendResult, recentGymsResult] = await Promise.all([
            GymModel.countDocuments({}), // Removed isDeleted: false as it's missing in GymSchema
            GymModel.countDocuments({ subscriptionStatus: "Active" }),
            GymModel.countDocuments({ approvalStatus: "Pending" }),
            SubscriptionModel.aggregate([
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            SubscriptionModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
                    }
                },
                {
                    $group: {
                        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                        revenue: { $sum: "$amount" }
                    }
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } }
            ]),
            GymModel.find({}).sort({ createdAt: -1 }).limit(5)
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // Generate last 6 months trend
        const revenueTrend = [];
        const now = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            
            // Find existing revenue for this month/year from aggregate
            const existing = revenueTrendResult.find((item: any) => 
                item._id.month === month && item._id.year === year
            );
            
            revenueTrend.push({
                month: `${monthNames[month - 1]} ${year}`,
                revenue: existing ? existing.revenue : 0
            });
        }

        const recentGyms = recentGymsResult.map((gym: any) => ({
            id: gym._id.toString(),
            name: gym.gymName,
            ownerName: gym.email,
            registrationDate: gym.createdAt,
            status: gym.approvalStatus
        }));

        return {
            totalGyms,
            activeGyms,
            pendingGyms,
            totalRevenue: totalRevenueRes[0]?.total || 0,
            revenueTrend,
            recentGyms
        };
    }
}

