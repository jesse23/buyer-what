import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils, Item, Contact } from '../../app/utils';

@Component({
  selector: 'page-shippingEdit',
  templateUrl: 'shippingEdit.html'
})
export class ShippingEditPage {

  contact: Contact;
  item: Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils ) {
    this.item = navParams.get('item');
    if ( !this.item ){
      // TODO: should error out
    }
    this.contact = utils.findOrCreateContact(this.item.owner);
  }
  
  createOrder() {
    this.navCtrl.pop();
  }

  doSomething( item: Item, $event: Event) {
    item.shipmentDate = new Date();
  }
}
