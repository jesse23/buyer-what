import _ from "lodash";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SummaryEditPage } from './summaryEdit';
import { Item, Utils } from '../../app/utils';

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {

  editPage: any;
  groupBy: string;
  rawList: Item[];
  listGroup: Item[][];

  constructor(public navCtrl: NavController, public utils: Utils ) {
    this.editPage = SummaryEditPage;
    this.groupBy = "owner";
  }

  ionViewDidEnter(){
    this.listGroup = this.getListGroup();
  }

  getListGroup() : Item[][]{
    return _.values(_.groupBy(this.utils.itemList, this.groupBy ));
  }

}
