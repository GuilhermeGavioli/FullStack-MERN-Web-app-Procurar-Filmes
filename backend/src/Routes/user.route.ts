import { userController } from "../Objects";
import express from 'express'
export const router = express.Router()

router.get('/auth/google/:oauth_access_token', (rq:any,rs:any) => userController.authGoogle(rq,rs))