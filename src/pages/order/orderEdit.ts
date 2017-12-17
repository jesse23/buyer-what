import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils, Item } from '../../app/utils';

@Component({
  selector: 'page-orderEdit',
  templateUrl: 'orderEdit.html'
})
export class OrderEditPage {

  item: Item;
  showCost: boolean;
  isNew: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils ) {
    this.item = navParams.get('item');
    if ( !this.item ){
      this.item = Item.createItem();
      this.isNew = true;
    }
    this.showCost = navParams.get('showCost');
  }
  
  createOrder() {
    if ( this.isNew ) {
      this.utils.itemList.push(this.item);
    } else {
    }
    this.navCtrl.pop();
  }
}
