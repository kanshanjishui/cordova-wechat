# cordova-wtto00-wechat

微信 cordova 插件

参考：[xu-li/cordova-plugin-wechat](https://github.com/xu-li/cordova-plugin-wechat)

- 🌟 添加 TS 类型提示
- 🐛 修改不支持 Android 13 的问题
- 🌟 改用在线最新微信 SDK 包
- 🌟 支持拉起微信客服
- 🌟 支持微信开放标签拉起 APP

## 支持平台

- android
- ios

## 安装

```shell
cordova plugin add cordova-wtto00-wechat --variable WECHATAPPID=YOUR_WECHAT_APPID --variable UNIVERSALLINK=YOUR_UNIVERSAL_LINK
```

## 移除

```shell
cordova plugin rm cordova-plugin-wechat --variable WECHATAPPID=YOUR_WECHAT_APPID --variable UNIVERSALLINK=YOUR_UNIVERSAL_LINK
```

## 用法

### 检查微信是否安装

```javascript
Wechat.isInstalled(
  function (installed) {
    alert("Wechat installed: " + (installed ? "Yes" : "No"));
  },
  function (reason) {
    alert("Failed: " + reason);
  }
);
```

### 微信认证登录

[官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)
| 参数名称 | 参数类型 | 是否必须 | 说明 |
| -------- | -------- | -------- | -------------- |
| scope | string | 是 | 授权域 |
| state | string | 是 | 标识符唯一即可 |

```javascript
var scope = "snsapi_userinfo",
  state = "_" + +new Date();
Wechat.auth(
  scope,
  state,
  function (response) {
    // you may use response.code to get the access token.
    alert(JSON.stringify(response));
  },
  function (reason) {
    alert("Failed: " + reason);
  }
);
```

### 微信分享

[官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Share_and_Favorites/Share_and_Favorites.html)

#### 分享文本

| 参数名称 | 参数类型 | 是否必须 | 说明           |
| -------- | -------- | -------- | -------------- |
| text     | string   | 是       | 分享的文本内容 |
| scene    | int      | 是       | 发送的目标场   |

```javascript
Wechat.share(
  {
    text: "This is just a plain string",
    scene: Wechat.Scene.TIMELINE, // share to Timeline
  },
  function () {
    alert("Success");
  },
  function (reason) {
    alert("Failed: " + reason);
  }
);
```

#### 分享媒体(链接、图片、音乐、视频、小程序)

| 参数名称 | 参数类型 | 是否必须 | 说明                                                          |
| -------- | -------- | -------- | ------------------------------------------------------------- |
| scene    | int      | 是       | 发送的目标场                                                  |
| message  | object   | 否       | 微信媒体消息内容，媒体类型分享([ShareMessage](#message-参数)) |

##### message 参数

| 参数名称    | 参数类型 | 是否必须 | 说明                                     |
| ----------- | -------- | -------- | ---------------------------------------- |
| title       | string   | 是       | 消息标题，限制长度不超过 512Bytes        |
| description | string   | 是       | 消息描述，限制长度不超过 1KB             |
| thumb       | string   | 是       | 缩略图（支持本地资源，远程资源，base64） |
| media       | object   | 是       | 媒体消息内容（详见下方各类别参数说明）   |

##### 分享链接网页

| 参数名称   | 参数类型 | 是否必须 | 说明             |
| ---------- | -------- | -------- | ---------------- |
| type       | int      | 是       | 分享类型，固定值 |
| webpageUrl | string   | 是       | 网页链接         |

```javascript
Wechat.share({
    message: {
        ...
        media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: "http://www.jason-z.com"
        }
    },
    scene: Wechat.Scene.TIMELINE   // share to Timeline
}, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});
```

#### 分享图片

| 参数名称 | 参数类型 | 是否必须 | 说明                                       |
| -------- | -------- | -------- | ------------------------------------------ |
| type     | int      | 是       | 分享类型，固定值                           |
| image    | string   | 是       | 分享图片（支持本地资源，远程资源，base64） |

```javascript
Wechat.share(
  {
    message: {
      title: "这是分享的标题",
      description: "这是分享的描述",
      thumb: "www/assets/imgs/logo.png",
      media: {
        type: Wechat.Type.IMAGE,
        image: "https://www.jason-z.com/storage/test_image.jpg",
      },
    },
    scene: Wechat.Scene.TIMELINE,
  },
  function () {
    alert("Success");
  },
  function (reason) {
    alert("Failed: " + reason);
  }
);
```

#### 分享音乐

| 参数名称     | 参数类型 | 是否必须 | 说明                |
| ------------ | -------- | -------- | ------------------- |
| type         | int      | 是       | 分享类型，固定值    |
| musicUrl     | string   | 是       | 音频网页的 URL 地址 |
| musicDataUrl | string   | 是       | 音频数据的 URL 地址 |

```javascript
Wechat.share(
  {
    message: {
      title: "这是分享的标题",
      description: "这是分享的描述",
      thumb: "www/assets/imgs/logo.png",
      media: {
        type: Wechat.Type.MUSIC,
        musicUrl: "https://www.jason-z.com",
        musicDataUrl: "https://www.jason-z.com/storage/test_audio.mp3",
      },
    },
    scene: Wechat.Scene.TIMELINE,
  },
  function () {
    alert("Success");
  },
  function (reason) {
    alert("Failed: " + reason);
  }
);
```

#### 分享视频

| 参数名称 | 参数类型 | 是否必须 | 说明                |
| -------- | -------- | -------- | ------------------- |
| type     | int      | 是       | 分享类型，固定值    |
| videoUrl | string   | 是       | 视频网页的 URL 地址 |

```javascript
Wechat.share(
  {
    message: {
      title: "这是分享的标题",
      description: "这是分享的描述",
      thumb: "www/assets/imgs/logo.png",
      media: {
        type: Wechat.Type.VIDEO,
        videoUrl: "https://www.jason-z.com/storage/test_video.mp4",
      },
    },
    scene: Wechat.Scene.TIMELINE,
  },
  function () {
    alert("Success");
  },
  function (reason) {
    alert("Failed: " + reason);
  }
);
```

#### 分享到小程序

| 参数名称        | 参数类型 | 是否必须 | 说明                                                  |
| --------------- | -------- | -------- | ----------------------------------------------------- |
| type            | int      | 是       | 分享类型，固定值                                      |
| webpageUrl      | string   | 是       | 兼容低版本的网页链接                                  |
| userName        | string   | 是       | 小程序原始 id                                         |
| path            | string   | 是       | 小程序页面路径                                        |
| hdImageData     | string   | 是       | 分享缩略图（支持 url 和 base64）                      |
| withShareTicket | boolean  | 是       | 是否使用带 shareTicket 的分享                         |
| miniprogramType | int      | 是       | 小程序类型：RELEASE 发布版 TEST 测试版 PREVIEW 体验版 |

```javascript
Wechat.share({
    message: {
        ...
        media: {
            type: Wechat.Type.MINI,
            webpageUrl: "https://www.jason-z.com", // 兼容低版本的网页链接
            userName: "wxxxxxxxx", // 小程序原始id
            path: "user/info", // 小程序的页面路径
            hdImageData: "http://wwww.xxx.com/xx.jpg", // 程序新版本的预览图二进制数据 不超过128kb 支持 地址 base64 temp
            withShareTicket: true, // 是否使用带shareTicket的分享
            miniprogramType: Wechat.Mini.RELEASE
        }
    },
    scene: Wechat.Scene.SESSION   // 小程序仅支持聊天界面
}, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});
```

### 发送支付请求

[官方文档](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_5_2.shtml)
| 参数名称 | 参数类型 | 是否必须 | 说明 |
| ------ |---|---| -------- |
| mch_id |string|是| 商户 ID |
| prepay_id |string|是| 预支付交易会话标识 |
| nonce |string|是| 随机数 |
| timestamp |string|是| 时间戳 |
| sign |string|是| 签名 |

```javascript
var params = {
  partnerid: "10000100", // merchant id
  prepayid: "wx201411101639507cbf6ffd8b0779950874", // prepay id
  noncestr: "1add1a30ac87aa2db72f57a2375d8fec", // nonce
  timestamp: "1439531364", // timestamp
  sign: "0CB01533B8C1EF103065174F50BCA001", // signed string
};

Wechat.sendPaymentRequest(
  params,
  function () {
    alert("Success");
  },
  function (reason) {
    alert("Failed: " + reason);
  }
);
```

### 选择卡券包

[官方文档](https://developers.weixin.qq.com/doc/offiaccount/WeChat_Invoice/E_Invoice/Reimburser_API_List.html#4)
| 参数名称 | 参数类型 | 是否必须 | 说明 |
| ------ | --|--|-------- |
| signType |string|是| 签名类型 |
| cardSign |string|是| 签名 |
| nonceStr |string|是| 随机数 |
| timeStamp |string|是| 时间戳 |

```javascript
const params = {
  timeStamp: "1510198391", // timeStamp
  signType: "SHA1", // sign type
  cardSign: "dff450eeeed08120159d285e79737173aec3df94", // cardSign
  nonceStr: "5598190f-5fb3-4bff-8314-fd189ab4e4b8", // nonce
};

Wechat.chooseInvoiceFromWX(
  params,
  function (data) {
    console.log(data);
  },
  function () {
    alert("error");
  }
);
```

### 打开微信微信小程序

[官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Launching_a_Mini_Program/Launching_a_Mini_Program.html)
| 参数名称 | 参数类型 | 是否必须 | 说明 |
| --------------- | --|--|----------------------------------------------------- |
| userName | string|是|小程序原始 id |
| path | string|是|小程序页面路径，不填默认进入首页 |
| miniprogramType | int|是|小程序类型：RELEASE 发布版 TEST 测试版 PREVIEW 体验版 |

```javascript
var params = {
  userName: "gh_d43f693ca31f",
  path: "pages/index/index?name1=key1&name2=key2",
  miniprogramType: Wechat.Mini.RELEASE,
};

Wechat.openMiniProgram(
  params,
  function (data) {
    console.log(data); // data:{extMsg:""}  extMsg: Corresponds to the app-parameter attribute in the Mini Program component <button open-type="launchApp">
  },
  function () {
    alert("error");
  }
);
```

### 拉起微信客服

[官方文档](https://developer.work.weixin.qq.com/document/28755)
| 参数 | 备注 |
| ------ | -------- |
| corpId | 企业 ID |
| url | 客服 URL |

```javascript
Wechat.openCustomerServiceChat(
  { corpId: "corporate_id", url: "https://work.weixin.qq.com/kfid/kfxxxxxx" },
  function (data) {
    console.log(data);
  },
  function (reason) {
    console.log(reason);
  }
);
```

### 微信公众号开放标签拉起 APP

[官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#%E8%B7%B3%E8%BD%ACAPP%EF%BC%9Awx-open-launch-app)

```js
// 监听开放标签拉起APP的事件
Wechat.listenLaunchFromWX((extinfo) => {
  // 已拉起APP，参数是extinfo
  console.log("extinfo: ", extinfo);
});

// 取消监听事件
Wechat.unListenLaunchFromWX();
```

### iOS 通过 universal link 打开 APP

**该方法仅 iOS 有效。**

由于微信登录跳转回 APP 使用的是 universal link，所以该插件必须监听 universal link 打开 APP 的事件才能处理登录逻辑。

但是这样会使[cordova-wtto00-universal-link](https://github.com/wtto00/cordova-wtto00-universal-link)插件监听的打开 APP 失效。

所以添加此方法，如果两者同时存在的话，iOS 在微信的监听方法中处理；安卓在原插件处理即可，不受影响。

```js
// 监听universal link拉起APP的事件
Wechat.listenLaunchFromUL((url) => {
  // 已拉起APP，参数是url
  console.log("universal link: ", url);
});

// 取消监听事件
Wechat.unListenLaunchFromUL();
```
