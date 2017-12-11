import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-newOrder',
  templateUrl: 'newOrder.html'
})
export class NewOrderPage {

  constructor(public navCtrl: NavController) {}
  
  createOrder() {
    this.navCtrl.pop();
  }
}
