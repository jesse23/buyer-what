import _ from "lodash";
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Events } from 'ionic-angular';
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
  deleted: boolean;

  carrier: string;
  trackNo: string;

  shipmentDate: Date;

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
                      trackNo:    string  = '',
                      shipmentDate: Date = null,
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
    item.shipmentDate = shipmentDate;
    item.deleted = false;
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
               @Inject(forwardRef(() => Events)) private events: Events,
               @Inject(forwardRef(() => ToastController)) private toastCtrl: ToastController ) { 

  }

  load() {
    this.storage.get('items').then((val) => {
      if ( val ){
        // HC for trackNo
        this.itemList = val;
        // this.itemList.push(Item.createItem('airpods','Jesse','Somerset',160,10, 200, true,true,'USPS','ship001', new Date('2017-11-01')));
        // this.itemList.push(Item.createItem('iphoneX','Lucy','Somerset',1150,10,1200, true,true,'USPS','ship001', new Date('2017-11-01')));
        // this.itemList.push(Item.createItem('ipad','Larry','Amazon',350,10,400, true,true,'USPS','ship001', new Date('2017-11-01')));
        _.map(val, (o:Item) => {if(!o.deleted){o.deleted=false}});
      } else {
        this.itemList.push(Item.createItem('airpods','Jesse','Somerset',160,10, 200, false));
        this.itemList.push(Item.createItem('iphoneX','Lucy','Somerset',1150,10,1200, false));
        this.itemList.push(Item.createItem('ipad','Larry','Amazon',350,10,400, false));
      }
      this.events.publish('buyerWhat.contentLoaded');
    });

    this.storage.get('contacts').then((val) => {
      if (val){
        this.contactList = val;
        /*
        this.contactList = [];
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
          */
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
    this.cleanList();
    return this.storage.set('items', this.itemList).then( () => {
      return this.storage.set('contacts', this.contactList);
    });
  }

  cleanList() {
    this.itemList = _.filter(this.itemList, { deleted: false });
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
  getUnPurchasedCount() : number {
    return _.filter(this.itemList, { purchased: false, deleted: false }).length;
  }

  getUnShippedCount() : number {
    return _.filter(this.itemList, (o:Item):boolean => {return o.purchased && (o.trackNo.length==0)}).length;
  }

  getTotalAmount( items: Item[] ) : number {
    return _.reduce(items, function( sum, o): number{
      return sum + ( (o.paid === true)? 0 : o.price );
      // return sum + ( o.price - (o.cost?o.cost:0) - (o.shipmentCost?o.shipmentCost:0));
    }, 0 );
  }

  getAvailablePurchaseList(): Item[] {
    return _.filter(this.itemList, (o:Item):boolean => {return o.trackNo.length==0 && o.deleted == false});
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
