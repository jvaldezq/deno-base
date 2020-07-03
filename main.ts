import { Application, Context } from 'https://deno.land/x/oak/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { notFoundController } from "./controllers/index.ts";
import router from './routes.ts';


const app = new Application();
const env = config();
const PORT = +env.APP_PORT || 4040;

app.use(router.routes());
app.use(notFoundController);
app.use(router.allowedMethods());

console.log(`The server started at http://localhost:${PORT}`)
await app.listen({ port: PORT });