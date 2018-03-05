import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils, Item } from '../../app/utils';

@Component({
  selector: 'page-accountEdit',
  templateUrl: 'purchaseEdit.html'
})
export class PurchaseEditPage {

  item: Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils ) {
    this.item = navParams.get('item');
  }
  
  createOrder() {
    this.navCtrl.pop();
  }

  deleteOrder() {
    this.item.deleted = true;
    this.navCtrl.pop();
  }
}
