// This file is created by egg-ts-helper@2.0.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportApiAttachment from '../../../app/controller/api/attachment';
import ExportApiBookmark from '../../../app/controller/api/bookmark';
import ExportApiBrand from '../../../app/controller/api/brand';
import ExportApiCaptcha from '../../../app/controller/api/captcha';
import ExportApiCategory from '../../../app/controller/api/category';
import ExportApiComments from '../../../app/controller/api/comments';
import ExportApiDigg from '../../../app/controller/api/digg';
import ExportApiFavourite from '../../../app/controller/api/favourite';
import ExportApiFeed from '../../../app/controller/api/feed';
import ExportApiLog from '../../../app/controller/api/log';
import ExportApiNews from '../../../app/controller/api/news';
import ExportApiPin from '../../../app/controller/api/pin';
import ExportApiSetting from '../../../app/controller/api/setting';
import ExportApiSpu from '../../../app/controller/api/spu';
import ExportApiSts from '../../../app/controller/api/sts';
import ExportApiTag from '../../../app/controller/api/tag';
import ExportApiTopic from '../../../app/controller/api/topic';
import ExportApiUser from '../../../app/controller/api/user';
import ExportBackendCaptcha from '../../../app/controller/backend/captcha';
import ExportBackendComments from '../../../app/controller/backend/comments';
import ExportBackendDigg from '../../../app/controller/backend/digg';
import ExportBackendFeed from '../../../app/controller/backend/feed';
import ExportBackendLog from '../../../app/controller/backend/log';
import ExportBackendNews from '../../../app/controller/backend/news';
import ExportBackendPin from '../../../app/controller/backend/pin';
import ExportBackendProduct from '../../../app/controller/backend/product';
import ExportBackendSetting from '../../../app/controller/backend/setting';
import ExportBackendSts from '../../../app/controller/backend/sts';
import ExportBackendTag from '../../../app/controller/backend/tag';
import ExportBackendTopic from '../../../app/controller/backend/topic';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    api: {
      attachment: ExportApiAttachment;
      bookmark: ExportApiBookmark;
      brand: ExportApiBrand;
      captcha: ExportApiCaptcha;
      category: ExportApiCategory;
      comments: ExportApiComments;
      digg: ExportApiDigg;
      favourite: ExportApiFavourite;
      feed: ExportApiFeed;
      log: ExportApiLog;
      news: ExportApiNews;
      pin: ExportApiPin;
      setting: ExportApiSetting;
      spu: ExportApiSpu;
      sts: ExportApiSts;
      tag: ExportApiTag;
      topic: ExportApiTopic;
      user: ExportApiUser;
    }
    backend: {
      captcha: ExportBackendCaptcha;
      comments: ExportBackendComments;
      digg: ExportBackendDigg;
      feed: ExportBackendFeed;
      log: ExportBackendLog;
      news: ExportBackendNews;
      pin: ExportBackendPin;
      product: ExportBackendProduct;
      setting: ExportBackendSetting;
      sts: ExportBackendSts;
      tag: ExportBackendTag;
      topic: ExportBackendTopic;
    }
  }
}
