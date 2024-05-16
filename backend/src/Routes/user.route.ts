import { authGuard, userController } from "../objects.instances";
import express from 'express'
export const router = express.Router()

router.get('/auth/google/:oauth_access_token', (rq:any,rs:any) => userController.authGoogle(rq,rs))
router.get('/auth/user/getinfo', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => userController.getUserInfo(rq,rs))