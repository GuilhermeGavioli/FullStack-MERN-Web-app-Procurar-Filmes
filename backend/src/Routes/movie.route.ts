import { movieController } from "../objects.instances";
// import { authGuard } from "../objects.instances";
import { authGuard } from "../main";
import express from 'express'
export const router = express.Router()

router.get('/movie/:id', (rq,rs,nx) => authGuard.protect(rq,rs,nx) , (rq:any,rs:any) => movieController.getMovieById(rq,rs))
router.get('/movies/:page/:genre', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => movieController.getMoviesBatchByGenre(rq,rs))
