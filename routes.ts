import {Router} from 'https://deno.land/x/oak/mod.ts';
import {loginController, userController} from './controllers/index.ts';
import authMiddleware from './services/authMiddleware.ts';

const router = new Router();

router.post('/user', authMiddleware, userController);
router.post('/login', loginController);


export default router;
