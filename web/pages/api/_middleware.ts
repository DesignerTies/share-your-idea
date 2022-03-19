import type { NextFetchEvent, NextRequest } from 'next/server';
import cors from 'cors';
import morgan from 'morgan';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  cors();
  morgan('dev');
}
