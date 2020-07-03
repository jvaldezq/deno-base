import { Context } from 'https://deno.land/x/oak/mod.ts';


export default async (context: Context) =>
{
  const { value } = await context.request.body();
  console.log(value);
  context.response.body = 'Im a post respose';
}
