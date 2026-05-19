import { Router, Response, NextFunction } from "express";
import { chatController, callHistoryController } from "../../main/controllers.di";
import { protect, AuthRequest } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";
import { CHAT_ROUTES } from "../../constants/routes.constants";
import multer from "multer";

const router = Router();
const upload = multer();
const allowedRoles = [ROLES.GYM, ROLES.CLIENT, ROLES.TRAINER];

router.get(CHAT_ROUTES.CONVERSATIONS, protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.getConversations(req, res, next));

router.get(CHAT_ROUTES.CONVERSATION_BY_OTHER_ID, protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.getConversation(req, res, next));

router.get(CHAT_ROUTES.MESSAGES_BY_CONVERSATION_ID, protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.getMessages(req, res, next));

router.post(CHAT_ROUTES.SEND_MESSAGE, protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.sendMessage(req, res, next));

router.patch(CHAT_ROUTES.MARK_AS_READ, protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.markAsRead(req, res, next));
router.delete(CHAT_ROUTES.DELETE_MESSAGE, protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => chatController.deleteMessage(req, res, next));

router.get(CHAT_ROUTES.CALL_HISTORY, protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => callHistoryController.getUserHistory(req, res, next));
router.post(CHAT_ROUTES.CALL_HISTORY, protect(allowedRoles), (req: AuthRequest, res: Response, next: NextFunction) => callHistoryController.saveHistory(req, res, next));

router.post(CHAT_ROUTES.UPLOAD_ATTACHMENT, protect(allowedRoles), upload.single("file"), (req: AuthRequest, res: Response, next: NextFunction) => chatController.uploadAttachment(req, res, next));


export default router;

