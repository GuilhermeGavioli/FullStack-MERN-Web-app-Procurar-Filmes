import { router } from "../main";
import { movieController } from "../Objects";
import { AuthGuard } from "../Middlewares/authguard.middleware";

router.get('/movie/:id', AuthGuard.verifyToken, (rq:any,rs:any) => movieController.getMovieById(rq,rs))
router.get('/movies/:page/:genre', AuthGuard.verifyToken, (rq:any,rs:any) => movieController.getMoviesBatchByGenre(rq,rs))