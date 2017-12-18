import _ from "lodash";
import { Storage } from '@ionic/storage';
import { Platform, ToastController } from 'ionic-angular';
import { Inject, forwardRef } from '@angular/core';

export class Item {
  name : string;
  owner : string;
  location: string;
  cost : number;
  price : number;

  paid : boolean;
  purchased: boolean;

  carrier: string;
  trackNo: string;

  private constructor() {};

  static createItem ( name:       string  = '', 
                      owner:      string  = '', 
                      location:   string  = '',
                      cost:       number  = null, 
                      price:      number  = null,
                      paid:       boolean = false, 
                      purchased:  boolean = false, 
                      carrier:    string  = '',
                      trackNo:    string  = ''
                    ): Item {
    let item = new Item();
    item.name = name;
    item.owner = owner;
    item.location = location;
    item.cost = cost;
    item.price = price;
    item.paid = paid;
    item.purchased = purchased;
    item.carrier = carrier;
    item.trackNo = trackNo;
    return item;
  }
}

export class Utils {
  public itemList: Item[] = [];
  public groupBy: string;

  constructor( @Inject(forwardRef(() => Storage))  private storage: Storage,
               @Inject(forwardRef(() => Platform)) private platform: Platform,
               @Inject(forwardRef(() => ToastController)) private toastCtrl: ToastController ) { 
  }

  load() {
    this.storage.get('items').then((val) => {
      if ( val ){
        // HC for trackNo
        _.map(val, (o:Item) => {if(!o.carrier){o.carrier=''}});
        _.map(val, (o:Item) => {if(!o.trackNo){o.trackNo=''}});
        this.itemList = val;
      } else {
        this.itemList.push(Item.createItem('airpods','Jesse','Somerset',160,200, false));
        this.itemList.push(Item.createItem('iphoneX','Lucy','Somerset',1150,1200, false));
        this.itemList.push(Item.createItem('ipad','Larry','Amazon',350,400, false));
      }
    });

    this.platform.pause.subscribe(e => {
      return this.save();
    });

    window.addEventListener('beforeunload', () => {
      return this.save();
    });
  }

  save() : Promise<any> {
    return this.storage.set('items', this.itemList);
  }

  // Reader
  getShippingList() : Item[] {
    return _.filter(this.itemList, { purchased: true});
  }

  getPurchaseList() : Item[] {
    return _.filter(this.itemList, (o:Item):boolean => {return o.trackNo.length>0});
  }

  getUnPurchasedCount() : number {
    return _.filter(this.itemList, { purchased: false }).length;
  }

  getUnShippedCount() : number {
    return _.filter(this.itemList, (o:Item):boolean => {return o.purchased && (o.trackNo.length==0)}).length;
  }

  getTotalAmount() : number {
    return _.reduce(this.itemList, function( sum, o): number{
      return sum + (o.paid?( o.price - o.cost ):0);
    }, 0 );
  }

  // Test Helper
  popMsg( info : any ) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 3000
    });
    toast.present();
  }
  
}
