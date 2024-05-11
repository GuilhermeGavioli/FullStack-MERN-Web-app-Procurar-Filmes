

import express from 'express'

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


const app = express()
export const router = express.Router()

app.listen(3001, () => {
    console.log('Server is Up and Running')
})