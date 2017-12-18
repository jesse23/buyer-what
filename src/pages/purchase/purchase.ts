import _ from "lodash";
import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Item, Utils } from '../../app/utils';
import { PurchasePopPage } from './purchasePop';

@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {

  groupBy: string;
  rawList: Item[];
  listGroup: Item[][];

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController, public utils: Utils) {
    this.groupBy = "location";
  }

  ionViewDidEnter(){
    this.listGroup = this.getListGroup(true);
  }

  getListGroup(updateRawList: boolean) : Item[][]{
    if ( updateRawList ){
      this.rawList = _.filter(this.utils.itemList, { shipped: false});
    }
    return _.values(_.groupBy(this.rawList, this.groupBy ));
  }

  presentRadioPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(PurchasePopPage, {
      val: this.groupBy
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss(data => {
      this.groupBy = data;
      this.listGroup = this.getListGroup(false);
    });
}

}
