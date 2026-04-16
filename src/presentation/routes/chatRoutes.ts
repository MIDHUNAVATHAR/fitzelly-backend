import { Router, Response, NextFunction } from "express";
import { chatController, callHistoryController } from "../../main/controllers.di";
import { protect, AuthRequest } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";
import multer from "multer";

const router = Router();
const upload = multer();
const allowedRoles = [ROLES.GYM, ROLES.CLIENT, ROLES.TRAINER];

// Get all conversations for the logged-in user
router.get("/conversations", protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.getConversations(req, res, next));

// Get or create conversation with another user
router.get("/conversation/:otherId", protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.getConversation(req, res, next));

// Get messages for a conversation
router.get("/messages/:conversationId", protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.getMessages(req, res, next));

// Send a message
router.post("/messages", protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.sendMessage(req, res, next));

// Mark messages as read
router.patch("/messages/:conversationId/read", protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.markAsRead(req, res, next));
router.delete("/messages/:messageId", protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.deleteMessage(req, res, next));

// Call History routes
router.get("/call-history", protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => callHistoryController.getUserHistory(req, res, next));
router.post("/call-history", protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => callHistoryController.saveHistory(req, res, next));

// Attachment upload
router.post("/attachment", protect(allowedRoles), upload.single("file"), (req: AuthRequest, res: Response, next: NextFunction) => chatController.uploadAttachment(req, res, next));


export default router;
