import { MongoClient }  from 'mongodb'




  class Connection {
    private db: any;


    public async create(){
        try {
        const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_URI as string);
        // listen for fail events
        this.db = client.db(process.env.MONGODB_DB);
        console.log('Connected to MongoDB')
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }

    public retry(){
        // retry
    }

    public getDatabase(): any{
        return this.db
    }
  }

  // Should be a SingleTon
  
  const conn = new Connection();
  (async()=>{
    await conn.create()
})()
const db = conn.getDatabase()

export { conn };

//   