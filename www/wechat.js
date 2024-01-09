var exec = require("cordova/exec");
var platform = require("cordova/platform")

module.exports = {
  Scene: {
    SESSION: 0,
    TIMELINE: 1,
    FAVORITE: 2,
  },

  Type: {
    APP: 1,
    EMOTION: 2,
    FILE: 3,
    IMAGE: 4,
    MUSIC: 5,
    VIDEO: 6,
    WEBPAGE: 7,
    MINI: 8,
  },

  Mini: {
    RELEASE: 0,
    TEST: 1,
    PREVIEW: 2,
  },

  isInstalled: function (onSuccess, onError) {
    exec(onSuccess, onError, "Wechat", "isWXAppInstalled", []);
  },

  share: function (message, onSuccess, onError) {
    exec(onSuccess, onError, "Wechat", "share", [message]);
  },

  auth: function (scope, state, onSuccess, onError) {
    if (typeof scope == "function") {
      return exec(scope, state, "Wechat", "sendAuthRequest");
    }

    if (typeof state == "function") {
      return exec(state, onSuccess, "Wechat", "sendAuthRequest", [scope]);
    }

    return exec(onSuccess, onError, "Wechat", "sendAuthRequest", [scope, state]);
  },

  sendPaymentRequest: function (params, onSuccess, onError) {
    exec(onSuccess, onError, "Wechat", "sendPaymentRequest", [params]);
  },

  chooseInvoiceFromWX: function (params, onSuccess, onError) {
    exec(onSuccess, onError, "Wechat", "chooseInvoiceFromWX", [params]);
  },

  openMiniProgram: function (params, onSuccess, onError) {
    exec(onSuccess, onError, "Wechat", "openMiniProgram", [params]);
  },

  openCustomerServiceChat: function (params, onSuccess, onError) {
    exec(onSuccess, onError, "Wechat", "openCustomerServiceChat", [params]);
  },

  listenLaunchFromWX: function (callback) {
    if (!callback) {
      console.warn("Cordova Wechat: can't listen to event without a callback");
      return;
    }

    var innerCallback = function (msg) {
      callback(msg);
    };

    exec(innerCallback, null, "Wechat", "listenLaunchFromWX", []);
  },

  unListenLaunchFromWX: function () {
    exec(null, null, "Wechat", "unListenLaunchFromWX", []);
  },

  listenLaunchFromUL: function (callback) {
    if (platform !== 'ios') return
    if (!callback) {
      console.warn("Cordova Wechat: can't listen to event without a callback");
      return;
    }

    var innerCallback = function (msg) {
      callback(msg);
    };

    exec(innerCallback, null, "Wechat", "listenLaunchFromUL", []);
  },

  unListenLaunchFromUL: function () {
    if (platform !== 'ios') return
    exec(null, null, "Wechat", "unListenLaunchFromUL", []);
  },
};
