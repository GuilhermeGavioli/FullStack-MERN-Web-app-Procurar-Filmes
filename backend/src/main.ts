
import swaggerUi from 'swagger-ui-express'
import express from 'express'
import {OAuth2Client}  from 'google-auth-library'
import { specs } from './swagger.jsdoc'
import cors from 'cors'

// const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_SECRET_KEY)




import { Database } from './database';

const db: Database = new Database();
async function Connect(){
    const client = await db.createConnection()
    if (client){
        db.db = client.db(process.env.MONGODB_DB);
    } else {
        Connect()
    }
}


Connect();

export { db };










const app = express()
export const router = express.Router()

// Global Middlewares
router.use(router)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.use(cors({origin: '*', allowedHeaders: '*'}))












app.listen(3001, () => {
    console.log('Server is Up and Running')
})