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
  testList: Item[][];

  constructor(public navCtrl: NavController, public utils: Utils) {
    this.groupBy = "owner";
  }

  ionViewDidEnter(){
    this.testList = this.getList();
  }

  getList() : Item[][]{
    var a = _.filter(this.utils.itemList, { shipped: false});
    var b = _.groupBy(a, this.groupBy );
    var c = _.values(b);
    return c;
  }

}
