// This file is created by egg-ts-helper@2.0.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAttachment from '../../../app/service/attachment';
import ExportCaptcha from '../../../app/service/captcha';
import ExportComments from '../../../app/service/comments';
import ExportDigg from '../../../app/service/digg';
import ExportFeed from '../../../app/service/feed';
import ExportList from '../../../app/service/list';
import ExportLog from '../../../app/service/log';
import ExportNews from '../../../app/service/news';
import ExportPin from '../../../app/service/pin';
import ExportRedis from '../../../app/service/redis';
import ExportSetting from '../../../app/service/setting';
import ExportSts from '../../../app/service/sts';
import ExportTag from '../../../app/service/tag';
import ExportTopic from '../../../app/service/topic';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    attachment: AutoInstanceType<typeof ExportAttachment>;
    captcha: AutoInstanceType<typeof ExportCaptcha>;
    comments: AutoInstanceType<typeof ExportComments>;
    digg: AutoInstanceType<typeof ExportDigg>;
    feed: AutoInstanceType<typeof ExportFeed>;
    list: AutoInstanceType<typeof ExportList>;
    log: AutoInstanceType<typeof ExportLog>;
    news: AutoInstanceType<typeof ExportNews>;
    pin: AutoInstanceType<typeof ExportPin>;
    redis: AutoInstanceType<typeof ExportRedis>;
    setting: AutoInstanceType<typeof ExportSetting>;
    sts: AutoInstanceType<typeof ExportSts>;
    tag: AutoInstanceType<typeof ExportTag>;
    topic: AutoInstanceType<typeof ExportTopic>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
