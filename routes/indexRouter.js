import Router from 'express';
import { usersListGet, userListSearchGet } from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get("/", usersListGet);
indexRouter.get('/search', userListSearchGet);

export default indexRouter;