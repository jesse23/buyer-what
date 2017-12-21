import _ from "lodash";
import { Storage } from '@ionic/storage';
import { Platform, ToastController } from 'ionic-angular';
import { Inject, forwardRef } from '@angular/core';

export class Item {
  name : string;
  owner : string;
  location: string;
  cost : number;
  shipmentCost : number;
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
                      shipmentCost : number = null,
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
    item.shipmentCost = shipmentCost;
    item.price = price;
    item.paid = paid;
    item.purchased = purchased;
    item.carrier = carrier;
    item.trackNo = trackNo;
    return item;
  }
}

export class Contact {
  key      : string;
  realName : string;
  phoneNo  : number;
  id       : string;
  state    : string;
  city     : string;
  street   : string;
  postCode : number;

  private constructor() {};

  static createContact ( key      : string = '',
                         realName : string = '',
                         phoneNo  : number = null,
                         id       : string = '',
                         state    : string = '',
                         city     : string = '',
                         street   : string = '',
                         postCode : number = null
                    ): Contact {
    let contact = new Contact();
    contact.key = key;
    contact.realName = realName;
    contact.phoneNo = phoneNo;
    contact.id = id;
    contact.state = state;
    contact.city = city;
    contact.street = street;
    contact.postCode = postCode;
    return contact;
  }
}

export class Utils {
  public itemList: Item[] = [];
  public contactList: Contact[] = [];
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
        this.itemList.push(Item.createItem('airpods','Jesse','Somerset',160,10, 200, false));
        this.itemList.push(Item.createItem('iphoneX','Lucy','Somerset',1150,10,1200, false));
        this.itemList.push(Item.createItem('ipad','Larry','Amazon',350,10,400, false));
      }
    });

    this.storage.get('contacts').then((val) => {
      if (val){

      } else {
        this.contactList.push(Contact.createContact( 
          'Jesse',
          'Jesse Peng', 
          1234567891, 
          '23232x',
          'MI',
          'Detroit',
          '222 test Drive',
          43172));

        this.contactList.push(Contact.createContact( 
          'Lucy',
          'Lucy Lu', 
          1234567891, 
          '23232x',
          'MI',
          'Detroit',
          '222 test Drive',
          43172));

        this.contactList.push(Contact.createContact( 
          'Larry',
          'Larry Peng', 
          1234567891, 
          '23232x',
          'MI',
          'Detroit',
          '222 test Drive',
          43172));
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
    return this.storage.set('items', this.itemList).then( () => {
      return this.storage.set('contacts', this.contactList);
    });
  }

  // Contact
  findOrCreateContact( key: string ) : Contact {
    var res = null;
    var matchedList = _.filter(this.contactList, {key:key});
    if ( matchedList.length == 0 ) {
      res = Contact.createContact(key);
      this.contactList.push(res);
    } else {
      // return the 1st for now
      res = matchedList[0];
    }
    return res;
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
      return sum + (o.paid?( o.price - o.cost - o.shipmentCost ):0);
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
