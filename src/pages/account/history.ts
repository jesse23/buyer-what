import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  constructor(public navCtrl: NavController, public utils: Utils ) {
  }

}
