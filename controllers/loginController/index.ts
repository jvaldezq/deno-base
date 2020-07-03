import { Context } from 'https://deno.land/x/oak/mod.ts';
import users from '../../data/users.ts';
import { Jose, makeJwt, Payload, setExpiration } from 'https://deno.land/x/djwt/create.ts';
import { User } from '../../models/user.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import db from '../../config/database.ts';
const env = config();

const key = env.APP_JWT_KEY;

const header: Jose = {
  alg: 'HS256',
  typ: 'JWT',
};

interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
};

const databaseUsers = db.collection("users");

export default async (context: Context) => {
  const data = await databaseUsers.find();
  console.log('data', data);
  const { value } = await context.request.body();
  const exist = users.filter((user: User) => user.username === value.username && user.password === value.password);
  if (exist.length > 0) {
    const payload: Payload = {
      iss: exist[0].username,
      exp: setExpiration(new Date().getTime() + 60000),
    };
    const jwt = await makeJwt({ key, header, payload });
    if(jwt) {
      context.response.status = 200;
      context.response.body = {
        id: exist[0].id,
        username: exist[0].username,
        token: jwt
      };
    } else {
      context.response.body = {
        message: 'Internal server error'
      };
      context.response.status = 500;
    }
  } else {
    context.response.body = {
      message: 'Unauthorized'
    };
    context.response.status = 401;
  }
}
