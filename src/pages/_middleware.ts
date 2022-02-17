import type { NextFetchEvent, NextRequest } from 'next/server'
import { createConnection, getConnection } from "typeorm";



export function middleware(req: NextRequest, ev: NextFetchEvent) {

  /*const connect = async () => {
    if (!getConnection().isConnected) {
      const temp = await createConnection({
        type: 'postgres',
        url: process.env.CONNECTION_STRING,
        logging: true, //statements/queries console logged to terminal -> should remove when not debugging
        synchronize: true //will tralslate logic to sql
     })
    }
    return getConnection()
  };
  
  const connection = connect();
  */
  //req.body = {}
  //return new Response('Hello, world!')
}