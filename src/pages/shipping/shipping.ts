import _ from "lodash";
import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { ShippingEditPage } from './shippingEdit';
import { ShippingPopPage } from './shippingPop';
import { Item, Utils } from '../../app/utils';

@Component({
  selector: 'page-shipping',
  templateUrl: 'shipping.html'
})
export class ShippingPage {
  editPage: any;
  groupBy: string;
  rawList: Item[];
  listGroup: Item[][];

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController, public utils: Utils) {
    this.editPage = ShippingEditPage;
    this.groupBy = "owner";
  }

  ionViewDidEnter(){
    this.listGroup = this.getListGroup(true);
  }

  getListGroup(updateRawList: boolean) : Item[][]{
    if ( updateRawList ){
      this.rawList = _.filter(this.utils.itemList, { purchased: true});
    }
    return _.values(_.groupBy(this.rawList, this.groupBy ));
  }

  presentRadioPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(ShippingPopPage, {
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

}
