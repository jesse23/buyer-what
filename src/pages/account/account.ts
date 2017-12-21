import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderEditPage } from '../order/orderEdit';
import { HistoryPage } from './history';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  pushPage: any;
  historyPage: any;

  constructor(public navCtrl: NavController, public utils: Utils ) {
    this.pushPage = OrderEditPage;
    this.historyPage = HistoryPage;
  }

}
