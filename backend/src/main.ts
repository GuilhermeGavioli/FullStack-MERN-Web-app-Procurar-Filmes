import {OAuth2Client}  from 'google-auth-library'
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



import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { specs } from './swagger.jsdoc'
import express from 'express'

import { router as movieRouter } from './Routes/movie.route';
import { router as userRouter } from './Routes/user.route';
import { router as ratingRouter } from './Routes/rating.route';

const app = express()
app.use(movieRouter)
app.use(userRouter)
app.use(ratingRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors({origin: '*', allowedHeaders: '*'}))



app.listen(3001, () => {
    console.log('Server is Up and Running')
})