import { Component,
trigger,
state,
style,
transition,
animate } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderEditPage } from './orderEdit';
import { Utils } from '../../app/utils';

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

  pushPage: any;
  
  constructor(public navCtrl: NavController, public utils: Utils ) {
    this.pushPage = OrderEditPage;
  }

  print( obj: any ) {
    this.utils.popMsg(obj);
  }
}
