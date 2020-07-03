import {MongoClient} from 'https://deno.land/x/mongo@v0.8.0/mod.ts';
import {config} from 'https://deno.land/x/dotenv/mod.ts';


const env = config();
const client = new MongoClient();

await client.connectWithUri(`mongodb+srv://${env.APP_DB_USERNAME}:${env.APP_DB_PASSWORD}@cluster0.hom99.mongodb.net/${env.APP_DB}?retryWrites=true&w=majority`);

const db = client.database(env.APP_DB);

export default db;
