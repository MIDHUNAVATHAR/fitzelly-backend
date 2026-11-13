import { PlanRepository } from "./infrastructure/repositories/PlanRepository";
import { MembershipRepository } from "./infrastructure/repositories/MembershipRepository";

import { AddPlanUseCase } from "./application/use-cases/AddPlanUseCase";
import { GetPlansUseCase } from "./application/use-cases/GetPlansUseCase";
import { UpdatePlanUseCase } from "./application/use-cases/UpdatePlanUseCase";
import { DeletePlanUseCase } from "./application/use-cases/DeletePlanUseCase";

import { AddMembershipUseCase } from "./application/use-cases/AddMembershipUseCase";
import { GetMembershipsUseCase } from "./application/use-cases/GetMembershipsUseCase";
import { GetMembershipByIdUseCase } from "./application/use-cases/GetMembershipByIdUseCase";
import { UpdateMembershipUseCase } from "./application/use-cases/UpdateMembershipUseCase";
import { DeleteMembershipUseCase } from "./application/use-cases/DeleteMembershipUseCase";
import { AddPaymentUseCase } from "./application/use-cases/AddPaymentUseCase";
import { UpdatePaymentUseCase } from "./application/use-cases/UpdatePaymentUseCase";
import { DeletePaymentUseCase } from "./application/use-cases/DeletePaymentUseCase";
import { GetPaymentCollectionUseCase } from "./application/use-cases/GetPaymentCollectionUseCase";

import { GymPlanController } from "./presentation/controllers/GymPlanController";
import { GymMembershipController } from "./presentation/controllers/GymMembershipController";
import { createMembershipsRouter } from "./presentation/routes/memberships.routes";

import { IPaymentRepository } from "../payments/domain/repositories/IPaymentRepository";
import { IClientRepository } from "../clients/domain/repositories/IClientRepository";
import { ITrainerRepository } from "../trainers/domain/repositories/ITrainerRepository";

export interface MembershipsModuleDependencies {
    paymentRepository: IPaymentRepository;
    clientRepository: IClientRepository;
    trainerRepository: ITrainerRepository;
    planRepository?: PlanRepository;
    membershipRepository?: MembershipRepository;
}

export function initMembershipsModule(deps: MembershipsModuleDependencies) {
    const planRepository = deps.planRepository ?? new PlanRepository();
    const membershipRepository = deps.membershipRepository ?? new MembershipRepository();

    const addPlanUseCase = new AddPlanUseCase(planRepository);
    const getPlansUseCase = new GetPlansUseCase(planRepository);
    const updatePlanUseCase = new UpdatePlanUseCase(planRepository);
    const deletePlanUseCase = new DeletePlanUseCase(planRepository);

    const addMembershipUseCase = new AddMembershipUseCase(
        membershipRepository,
        planRepository,
        deps.clientRepository,
        deps.trainerRepository
    );
    const getMembershipsUseCase = new GetMembershipsUseCase(
        membershipRepository,
        deps.paymentRepository,
        planRepository
    );
    const getMembershipByIdUseCase = new GetMembershipByIdUseCase(
        membershipRepository,
        deps.paymentRepository,
        planRepository
    );
    const updateMembershipUseCase = new UpdateMembershipUseCase(
        membershipRepository,
        planRepository,
        deps.trainerRepository
    );
    const deleteMembershipUseCase = new DeleteMembershipUseCase(
        membershipRepository,
        deps.paymentRepository
    );

    const addPaymentUseCase = new AddPaymentUseCase(deps.paymentRepository, membershipRepository);
    const updatePaymentUseCase = new UpdatePaymentUseCase(deps.paymentRepository);
    const deletePaymentUseCase = new DeletePaymentUseCase(deps.paymentRepository);
    const getPaymentCollectionUseCase = new GetPaymentCollectionUseCase(deps.paymentRepository);

    const gymPlanController = new GymPlanController(
        addPlanUseCase,
        getPlansUseCase,
        updatePlanUseCase,
        deletePlanUseCase
    );

    const gymMembershipController = new GymMembershipController(
        addMembershipUseCase,
        getMembershipsUseCase,
        getMembershipByIdUseCase,
        updateMembershipUseCase,
        deleteMembershipUseCase,
        addPaymentUseCase,
        updatePaymentUseCase,
        deletePaymentUseCase,
        getPaymentCollectionUseCase
    );

    const router = createMembershipsRouter({
        gymPlanController,
        gymMembershipController,
    });

    return {
        router,
        repositories: {
            planRepository,
            membershipRepository,
        },
        controllers: {
            gymPlanController,
            gymMembershipController,
        },
        useCases: {
            addPlanUseCase,
            getPlansUseCase,
            updatePlanUseCase,
            deletePlanUseCase,
            addMembershipUseCase,
            getMembershipsUseCase,
            getMembershipByIdUseCase,
            updateMembershipUseCase,
            deleteMembershipUseCase,
            addPaymentUseCase,
            updatePaymentUseCase,
            deletePaymentUseCase,
            getPaymentCollectionUseCase,
        },
    };
}
