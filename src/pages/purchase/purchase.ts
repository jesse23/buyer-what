import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {


  constructor(public navCtrl: NavController, public utils: Utils) {
  }

}
