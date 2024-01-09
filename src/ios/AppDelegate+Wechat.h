//
//  AppDelegate+Wechat.h
//  cordova-plugin-wechat
//
//

#import "AppDelegate.h"

@interface AppDelegate (Wechat)

- (BOOL)application:(UIApplication *_Nullable)application openURL:(NSURL *_Nullable)url sourceApplication:(NSString *_Nullable)sourceApplication annotation:(id _Nullable )annotation;
- (BOOL)swizzleApplication:(UIApplication *_Nullable)application continueUserActivity:(NSUserActivity *_Nullable)userActivity restorationHandler:(void (^_Nullable)(NSArray * _Nullable))restorationHandler;

@end
