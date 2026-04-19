import Router from 'express';
import { emailUserCreateGet, emailUserCreatePost, emailUserUpadateGet, emailUserUpdatePost, emailUsersDeletePost } from '../controllers/emailUserController.js';
const emailUserRouter = Router();

emailUserRouter.get("/createEmail", emailUserCreateGet);
emailUserRouter.post("/createEmail", emailUserCreatePost);
emailUserRouter.get("/:id/updateEmail", emailUserUpadateGet);
emailUserRouter.post("/:id/updateEmail", emailUserUpdatePost);
emailUserRouter.post("/:id/deleteEmail", emailUsersDeletePost);

export default emailUserRouter;