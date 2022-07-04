import {Options, Request, Source } from './interfaces';

export type ReqAndOpt = Request & Options;

export type Subsource = Pick<Source, 'id' | 'name' | 'language'>

