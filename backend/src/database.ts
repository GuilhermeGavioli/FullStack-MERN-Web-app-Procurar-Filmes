import { Db, MongoClient }  from 'mongodb'

  export class Database {
    public db: null | Db = null;
    private client: MongoClient | null = null;

    constructor(){
    }

    public async createConnection(): Promise<MongoClient | undefined>{
        try {
        const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_URI as string);
        console.log('Conn2Mongo')
        return client
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }

    public retry(){
        // retry
    }

    public getDatabase(): Db | null{
        return this.db
    }
  }

  // Should be a SingleTon
  


//   