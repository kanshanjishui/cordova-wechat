//
//  CDVWechat.h
//  cordova-plugin-wechat
//
//

#import <Cordova/CDV.h>
#import <WXApi.h>
#import <WXApiObject.h>

enum  CDVWechatSharingType {
    CDVWXSharingTypeApp = 1,
    CDVWXSharingTypeEmotion,
    CDVWXSharingTypeFile,
    CDVWXSharingTypeImage,
    CDVWXSharingTypeMusic,
    CDVWXSharingTypeVideo,
    CDVWXSharingTypeWebPage,
    CDVWXSharingTypeMini
};

@interface CDVWechat:CDVPlugin <WXApiDelegate>

@property (nonatomic, strong) NSString *currentCallbackId;
@property (nonatomic, strong) NSString *wechatAppId;

- (void)isWXAppInstalled:(CDVInvokedUrlCommand *)command;
- (void)share:(CDVInvokedUrlCommand *)command;
- (void)sendAuthRequest:(CDVInvokedUrlCommand *)command;
- (void)sendPaymentRequest:(CDVInvokedUrlCommand *)command;
- (void)chooseInvoiceFromWX: (CDVInvokedUrlCommand *)command;
- (void)openMiniProgram: (CDVInvokedUrlCommand *)command;
- (void)openCustomerServiceChat: (CDVInvokedUrlCommand *)command;
- (BOOL)handleUserActivity:(NSUserActivity *)userActivity;
- (BOOL)handleWechatOpenURL:(NSURL *)url;
- (void)listenLaunchFromWX:(CDVInvokedUrlCommand *)command;
- (void)unListenLaunchFromWX:(CDVInvokedUrlCommand *)command;
- (void)listenLaunchFromUL:(CDVInvokedUrlCommand *)command;
- (void)unListenLaunchFromUL:(CDVInvokedUrlCommand *)command;
@end
