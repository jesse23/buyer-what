import _ from "lodash";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountEditPage } from './accountEdit';
import { Item, Utils } from '../../app/utils';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  editPage: any;
  groupBy: string;
  rawList: Item[];
  listGroup: Item[][];

  constructor(public navCtrl: NavController, public utils: Utils ) {
    this.editPage = AccountEditPage;
    this.groupBy = "owner";
  }

  ionViewDidEnter(){
    this.listGroup = this.getListGroup();
  }

  getListGroup() : Item[][]{
    return _.values(_.groupBy(_.filter(this.utils.itemList, { 'paid': false }), this.groupBy ));
  }

}
