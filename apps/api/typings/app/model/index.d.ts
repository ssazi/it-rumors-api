// This file is created by egg-ts-helper@2.0.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAttachment from '../../../app/model/attachment';
import ExportBookmark from '../../../app/model/bookmark';
import ExportChanges from '../../../app/model/changes';
import ExportComments from '../../../app/model/comments';
import ExportCompany from '../../../app/model/company';
import ExportDigg from '../../../app/model/digg';
import ExportFavourite from '../../../app/model/favourite';
import ExportFeed from '../../../app/model/feed';
import ExportList from '../../../app/model/list';
import ExportLog from '../../../app/model/log';
import ExportNews from '../../../app/model/news';
import ExportPin from '../../../app/model/pin';
import ExportProduct from '../../../app/model/product';
import ExportSetting from '../../../app/model/setting';
import ExportTag from '../../../app/model/tag';
import ExportTopic from '../../../app/model/topic';
import ExportUser from '../../../app/model/user';
import ExportUserFollow from '../../../app/model/user_follow';

declare module 'egg' {
  interface IModel {
    Attachment: ReturnType<typeof ExportAttachment>;
    Bookmark: ReturnType<typeof ExportBookmark>;
    Changes: ReturnType<typeof ExportChanges>;
    Comments: ReturnType<typeof ExportComments>;
    Company: ReturnType<typeof ExportCompany>;
    Digg: ReturnType<typeof ExportDigg>;
    Favourite: ReturnType<typeof ExportFavourite>;
    Feed: ReturnType<typeof ExportFeed>;
    List: ReturnType<typeof ExportList>;
    Log: ReturnType<typeof ExportLog>;
    News: ReturnType<typeof ExportNews>;
    Pin: ReturnType<typeof ExportPin>;
    Product: ReturnType<typeof ExportProduct>;
    Setting: ReturnType<typeof ExportSetting>;
    Tag: ReturnType<typeof ExportTag>;
    Topic: ReturnType<typeof ExportTopic>;
    User: ReturnType<typeof ExportUser>;
    UserFollow: ReturnType<typeof ExportUserFollow>;
  }
}
