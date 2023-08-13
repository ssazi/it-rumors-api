// This file is created by egg-ts-helper@2.0.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAttachment from '../../../app/model/attachment';
import ExportAttribute from '../../../app/model/attribute';
import ExportBookmark from '../../../app/model/bookmark';
import ExportBrand from '../../../app/model/brand';
import ExportCategory from '../../../app/model/category';
import ExportComments from '../../../app/model/comments';
import ExportDigg from '../../../app/model/digg';
import ExportFavourite from '../../../app/model/favourite';
import ExportFeed from '../../../app/model/feed';
import ExportLog from '../../../app/model/log';
import ExportNews from '../../../app/model/news';
import ExportPin from '../../../app/model/pin';
import ExportSetting from '../../../app/model/setting';
import ExportSku from '../../../app/model/sku';
import ExportSpu from '../../../app/model/spu';
import ExportSpuAttributeValue from '../../../app/model/spu_attribute_value';
import ExportSpuGroup from '../../../app/model/spu_group';
import ExportSpuImages from '../../../app/model/spu_images';
import ExportTag from '../../../app/model/tag';
import ExportTopic from '../../../app/model/topic';
import ExportUser from '../../../app/model/user';
import ExportUserFollow from '../../../app/model/user_follow';

declare module 'egg' {
  interface IModel {
    Attachment: ReturnType<typeof ExportAttachment>;
    Attribute: ReturnType<typeof ExportAttribute>;
    Bookmark: ReturnType<typeof ExportBookmark>;
    Brand: ReturnType<typeof ExportBrand>;
    Category: ReturnType<typeof ExportCategory>;
    Comments: ReturnType<typeof ExportComments>;
    Digg: ReturnType<typeof ExportDigg>;
    Favourite: ReturnType<typeof ExportFavourite>;
    Feed: ReturnType<typeof ExportFeed>;
    Log: ReturnType<typeof ExportLog>;
    News: ReturnType<typeof ExportNews>;
    Pin: ReturnType<typeof ExportPin>;
    Setting: ReturnType<typeof ExportSetting>;
    Sku: ReturnType<typeof ExportSku>;
    Spu: ReturnType<typeof ExportSpu>;
    SpuAttributeValue: ReturnType<typeof ExportSpuAttributeValue>;
    SpuGroup: ReturnType<typeof ExportSpuGroup>;
    SpuImages: ReturnType<typeof ExportSpuImages>;
    Tag: ReturnType<typeof ExportTag>;
    Topic: ReturnType<typeof ExportTopic>;
    User: ReturnType<typeof ExportUser>;
    UserFollow: ReturnType<typeof ExportUserFollow>;
  }
}
