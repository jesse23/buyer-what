import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewOrderPage } from './newOrder';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  
  constructor(public navCtrl: NavController) {}

  push() {
    this.navCtrl.push(NewOrderPage);
  }

}
