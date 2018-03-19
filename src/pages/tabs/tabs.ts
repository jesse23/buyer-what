import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { SummaryPage } from '../summary/summary';
import { PurchasePage } from '../purchase/purchase';
import { ShippingPage } from '../shipping/shipping';
// import { OrderPage } from '../order/order';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../../app/utils';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  constructor(translate: TranslateService, public utils: Utils) {
    // Do it only at root page - it should be OK for now.
    translate.setDefaultLang('zh');
  }

  ionViewDidLoad() {
    this.utils.load();
  }
  ionViewWillUnload() {
    this.utils.save();
  }

  tab1Root = PurchasePage;
  tab2Root = ShippingPage;
  tab3Root = AccountPage;
  tab4Root = SummaryPage;
}
