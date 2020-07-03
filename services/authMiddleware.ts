import {Context} from 'https://deno.land/x/oak/mod.ts';
import {validateJwt} from "https://deno.land/x/djwt/validate.ts";
import {config} from 'https://deno.land/x/dotenv/mod.ts';

const env = config();

export default async (context: Context, next: any) => {
    const {value} = await context.request.body();
    const headers: Headers = await context.request.headers;
    const authorization = await headers.get('Authorization');
    if (!authorization) {
        context.response.status = 401;
        return;
    }
    const jwt = authorization.split(' ')[1];
    if (!jwt) {
        context.response.status = 401;
        return;
    }
    const validate = await validateJwt(jwt, env.APP_JWT_KEY);
    if (validate.isValid) {
        await next();
        return;
    }
    context.response.status = 401;
    context.response.body = {
        message: 'Invalid token'
    };
    return;

}
