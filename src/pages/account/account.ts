import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountEditPage } from './accountEdit';
import { HistoryPage } from './history';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  editPage: any;
  historyPage: any;

  constructor(public navCtrl: NavController, public utils: Utils ) {
    this.editPage = AccountEditPage;
    this.historyPage = HistoryPage;
  }

}
