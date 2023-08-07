// This file is created by egg-ts-helper@2.0.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTool from '../../../app/utils/tool';

declare module 'egg' {
  interface Application {
    utils: T_custom_utils;
  }

  interface T_custom_utils {
    Tool: AutoInstanceType<typeof ExportTool>;
  }
}
