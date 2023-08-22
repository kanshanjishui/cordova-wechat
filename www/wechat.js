var exec = require("cordova/exec");

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

    return exec(onSuccess, onError, "Wechat", "sendAuthRequest", [
      scope,
      state,
    ]);
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
};
