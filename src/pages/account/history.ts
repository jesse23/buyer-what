import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'history.html'
})
export class HistoryPage {
  val : string;

  constructor( private viewCtrl: ViewController, private navParams: NavParams ) {}
  
  ngOnInit() {
    if (this.navParams.data) {
      this.val = this.navParams.data.val;
    }
  }

  close(val) {
    this.viewCtrl.dismiss(val);
  }
}
