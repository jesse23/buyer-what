import _ from "lodash";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Item, Utils } from '../../app/utils';

@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {

  groupBy: string;

  constructor(public navCtrl: NavController, public utils: Utils) {
    this.groupBy = "owner";
  }

  getList() : Item[] {
    return _.sortBy(_.filter(this.utils.itemList, { shipped: false}), [this.groupBy, 'name']);
  }

}
