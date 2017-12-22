import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AccountPage } from '../pages/account/account';
import { AccountEditPage } from '../pages/account/accountEdit';
import { HistoryPage } from '../pages/account/history';
import { ShippingPage } from '../pages/shipping/shipping';
import { ShippingEditPage } from '../pages/shipping/shippingEdit';
import { ShippingPopPage } from '../pages/shipping/shippingPop';
import { OrderPage } from '../pages/order/order';
import { OrderEditPage } from '../pages/order/orderEdit';
import { PurchasePage } from '../pages/purchase/purchase';
import { PurchaseEditPage } from '../pages/purchase/purchaseEdit';
import { PurchasePopPage } from '../pages/purchase/purchasePop';
import { TabsPage } from '../pages/tabs/tabs';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { Clipboard } from '@ionic-native/clipboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utils } from './utils';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    AccountEditPage,
    HistoryPage,
    ShippingPage,
    ShippingEditPage,
    ShippingPopPage,
    PurchasePage,
    PurchasePopPage,
    PurchaseEditPage,
    OrderPage,
    OrderEditPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    AccountEditPage,
    HistoryPage,
    PurchasePage,
    PurchasePopPage,
    PurchaseEditPage,
    ShippingPage,
    ShippingEditPage,
    ShippingPopPage,
    OrderPage,
    OrderEditPage,
    TabsPage
  ],
  providers: [
    Clipboard,
    StatusBar,
    SplashScreen,
    Utils,
    { 
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
  ]
})
export class AppModule {}
