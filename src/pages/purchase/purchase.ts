import _ from "lodash";
import { Component } from '@angular/core';
import { NavController, PopoverController, Events } from 'ionic-angular';
import { Item, Utils } from '../../app/utils';
import { PurchasePopPage } from './purchasePop';
import { PurchaseEditPage } from './purchaseEdit';
import { AddOrderPage } from './addOrderPage';

@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {

  addOrderPage: any;
  groupBy: string;
  rawList: Item[];
  listGroup: Item[][];

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController, public utils: Utils, private events: Events) {
    this.groupBy = "location";
    this.events.subscribe('buyerWhat.contentLoaded', () => {
      this.listGroup = this.getListGroup(true);
    });
    this.addOrderPage = AddOrderPage;
  }

  ionViewDidEnter(){
    this.listGroup = this.getListGroup(true);
  }

  getListGroup(updateRawList: boolean) : Item[][]{
    if ( updateRawList ){
      this.rawList = _.filter(this.utils.itemList, (o:Item):boolean => {return o.trackNo.length==0});
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
      if ( data ) {
        this.groupBy = data;
        this.listGroup = this.getListGroup(false)
      }
    });
  }

  pushItemEditPage(item: Item){
      this.navCtrl.push(PurchaseEditPage, {item:item});
  }

}
