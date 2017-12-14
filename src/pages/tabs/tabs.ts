import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { PurchasePage } from '../purchase/purchase';
import { ShippingPage } from '../shipping/shipping';
import { OrderPage } from '../order/order';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../../app/utils';

import { File } from '@ionic-native/file';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  constructor(translate: TranslateService, public utils: Utils, public file: File ) {
    // Do it only at root page - it should be OK for now.
    translate.setDefaultLang('zh');
  }

  ionViewDidLoad() {
    /*this.file.checkDir(this.file.dataDirectory, 'mydir').then(function(){
      console.log('Directory exists');
    }).catch(function(){ 
      console.log('Directory doesnt exist');
    });*/
    console.log("Data loc: " + this.file.dataDirectory);
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }

  tab1Root = OrderPage;
  tab2Root = PurchasePage;
  tab3Root = ShippingPage;
  tab4Root = AccountPage;
}
