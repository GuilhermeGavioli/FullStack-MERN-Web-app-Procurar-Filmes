import { router } from "../main";
import { userController } from "../Objects";

router.get('/auth/google/:oauth_access_token', (rq:any,rs:any) => userController.authGoogle(rq,rs))