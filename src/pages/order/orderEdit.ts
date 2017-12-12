import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils, Item } from '../../app/utils';

@Component({
  selector: 'page-orderEdit',
  templateUrl: 'orderEdit.html'
})
export class OrderEditPage {

  item: Item;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils ) {
    this.item = navParams.get('item');
    this.index = navParams.get('index');
    if ( !this.item ){
      this.item = Item.createItem();
      this.index = -1;
    }
  }
  
  createOrder() {
    if ( this.index === -1 ) {
      this.utils.itemList.push(this.item);
    } else {
      this.utils.itemList[this.index] = this.item;
    }
    this.navCtrl.pop();
  }
}
