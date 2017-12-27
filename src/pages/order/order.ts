import _ from "lodash";
import { Component,
trigger,
state,
style,
transition,
animate } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderEditPage } from './orderEdit';
import { Utils, Item } from '../../app/utils';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  animations: [
        trigger('listItemState', [
            state('in',
                style({
                    opacity: 1,
                    height:'*',
                    minHeight: '*'
                })
            ),
            transition('* => void', [
                animate('0.25s 10 ease-out', style({
                    opacity: 0,
                    height: '1px',
                    minHeight: '1px'
                  }))
            ])
        ])
    ]
})
export class OrderPage {

    editPage: any;
    itemList: Item[];

  constructor( navCtrl: NavController, public utils: Utils ) {
      this.editPage = OrderEditPage;
      this.itemList = this.getList();
  }

  ionViewDidEnter(){
    this.itemList = this.getList();
  }

  ionViewDidLeave(){
    this.utils.cleanList();
  }

  getList() : Item[]{
    return _.filter(this.utils.itemList, (o:Item):boolean => {return o.trackNo.length==0});
  }

}
