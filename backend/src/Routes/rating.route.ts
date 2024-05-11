import { router } from "../main";
import { ratingController } from "../Objects";
import { AuthGuard } from "../Middlewares/authguard.middleware";

router.post('/ratings/create/for_movie/:movie_id', AuthGuard.verifyToken, (rq:any,rs:any) => ratingController.createRating(rq,rs))
router.get('/ratings/delete/:id', AuthGuard.verifyToken, (rq:any,rs:any) => ratingController.deleteRating(rq,rs))
router.get('/ratings/:page/:movie_id', AuthGuard.verifyToken, (rq:any,rs:any) => ratingController.getRatingsBatchByMovieId(rq,rs))