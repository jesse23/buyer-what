import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderEditPage } from './orderEdit';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  pushPage: any;
  
  constructor(public navCtrl: NavController, public utils: Utils ) {
    this.pushPage = OrderEditPage;
    utils.loadTestFile();
  }
}
