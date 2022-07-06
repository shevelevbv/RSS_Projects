import {IOptions, IRequest, ISource } from './interfaces';

export type ReqAndOpt = IRequest & IOptions;

export type Subsource = Pick<ISource, 'id' | 'name' | 'language'>

