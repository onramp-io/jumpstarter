import { createConnection, getConnection } from "typeorm";
import type { NextFetchEvent, NextRequest } from 'next/server'
import connection from '../backend/model/db'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  //create connection if it doesn't exist
  //pass connection object to api call
  return new Response('Hello, world!')
}