import { authGuard } from './../objects.instances';
import { movieController } from "../objects.instances";
import express from 'express'
export const router = express.Router()

router.get('/movie/:id', (rq,rs,nx) => authGuard.protect(rq,rs,nx) , (rq:any,rs:any) => movieController.getMovieById(rq,rs))
router.get('/movies/:page/genres', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => movieController.getMoviesBatchByGenre(rq,rs))
router.get('/movies/sample/random', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => movieController.getTenRandomMovies(rq,rs))
router.get('/movies/results/:page', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => movieController.getMoviesByText(rq,rs))

// 