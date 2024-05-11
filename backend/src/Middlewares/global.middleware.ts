import { router } from '../main'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { specs } from '../swagger.jsdoc'

// Global Middlewares
router.use(router)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.use(cors({origin: '*', allowedHeaders: '*'}))
