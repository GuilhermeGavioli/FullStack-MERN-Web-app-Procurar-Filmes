import { movieController } from "../objects.instances";
import { AuthGuard } from "../Middlewares/authguard.middleware";
import express from 'express'
export const router = express.Router()

router.get('/movie/:id', AuthGuard.verifyToken, (rq:any,rs:any) => movieController.getMovieById(rq,rs))
router.get('/movies/:page/:genre', AuthGuard.verifyToken, (rq:any,rs:any) => movieController.getMoviesBatchByGenre(rq,rs))
