import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils, Item } from '../../app/utils';

@Component({
  selector: 'page-addOrder',
  templateUrl: 'addOrderPage.html'
})
export class AddOrderPage {

  item: Item;
  showCost: boolean;
  showPurchased: boolean;
  isNew: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils ) {
    this.item = navParams.get('item');
    if ( !this.item ){
      this.item = Item.createItem();
      this.isNew = true;
    }
    this.showCost = navParams.get('showCost');
    this.showPurchased = navParams.get('showPurchased');
  }
  
  createOrder() {
    if ( this.isNew ) {
      if ( typeof this.item.price === 'string' ){
        // Don't know why but put WA here for now.
        this.item.price = parseInt(this.item.price);
      }
      this.utils.itemList.push(this.item);
    } else {
    }
    this.navCtrl.pop();
  }
}
