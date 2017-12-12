import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewOrderPage } from './newOrder';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  items = this.utils.itemList;
  
  constructor(public navCtrl: NavController, public utils: Utils ) {
    utils.loadTestFile();
  }

  push() {
    this.navCtrl.push(NewOrderPage);
  }

}
