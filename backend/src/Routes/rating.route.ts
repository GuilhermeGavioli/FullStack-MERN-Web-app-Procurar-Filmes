import { ratingController } from "../Objects";
import { AuthGuard } from "../Middlewares/authguard.middleware";
import express from 'express'
export const router = express.Router()

router.post('/ratings/create/for_movie/:movie_id', AuthGuard.verifyToken, (rq:any,rs:any) => ratingController.createRating(rq,rs))
router.delete('/ratings/delete/:id', AuthGuard.verifyToken, (rq:any,rs:any) => ratingController.deleteRating(rq,rs))
router.get('/ratings/:movie_id/:page', AuthGuard.verifyToken, (rq:any,rs:any) => ratingController.getRatingsBatchByMovieId(rq,rs))

