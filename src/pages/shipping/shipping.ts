import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-shipping',
  templateUrl: 'shipping.html'
})
export class ShippingPage {

  constructor(public navCtrl: NavController, public utils: Utils) {

  }

}
