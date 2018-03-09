import _ from "lodash";
import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { AccountEditPage } from './accountEdit';
import { HistoryPage } from './history';
import { Item, Utils } from '../../app/utils';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  editPage: any;
  historyPage: any;
  groupBy: string;
  rawList: Item[];
  listGroup: Item[][];

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController, public utils: Utils ) {
    this.editPage = AccountEditPage;
    this.historyPage = HistoryPage;
    this.groupBy = "owner";
  }

  ionViewDidEnter(){
    this.listGroup = this.getListGroup();
  }

  getListGroup() : Item[][]{
    return _.values(_.groupBy(this.utils.itemList, this.groupBy ));
  }

  presentRadioPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(HistoryPage, {
      val: this.groupBy
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss(data => {
      if ( data ) {
        this.groupBy = data;
        this.listGroup = this.getListGroup();
      }
    });
  }

}
