import { ratingController } from "../objects.instances";
// import { authGuard } from "../objects.instances";
import { authGuard } from "../main";
import express from 'express'
export const router = express.Router()

router.post('/ratings/create/for_movie/:movie_id', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => ratingController.createRating(rq,rs))
router.delete('/ratings/delete/:id', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => ratingController.deleteRating(rq,rs))
router.get('/ratings/:movie_id/:page', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => ratingController.getRatingsBatchByMovieId(rq,rs))

