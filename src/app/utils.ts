// import { File } from '@ionic-native/file';
import _ from "lodash";

export class Item {
  name : string;
  owner : string;
  cost : number;
  price : number;

  paid : boolean;
  purchased: boolean;
  shipped: boolean;

  private constructor() {};

  static createItem ( name:       string  = '', 
                      owner:      string  = '', 
                      cost:       number  = null, 
                      price:      number  = null,
                      paid:       boolean = false, 
                      purchased:  boolean = false, 
                      shipped:    boolean = false 
                    ): Item {
    let item = new Item();
    item.name = name;
    item.owner = owner;
    item.cost = cost;
    item.price = price;
    item.paid = paid;
    item.purchased = purchased;
    item.shipped = shipped;
    return item;
  }
}

export class Utils {
  // constructor(private file: File) {}
  public itemList: Item[] = [];

  constructor() {
  };

  loadTestFile(){
    this.itemList.push(Item.createItem('airpods','Jesse',160,200, false));
    this.itemList.push(Item.createItem('iphoneX','Lucy',1150,1200, false));
    this.itemList.push(Item.createItem('ipad','Larry',350,400, false));
  }

  getShippingList() : Item[] {
    return _.filter(this.itemList, { purchased: true});
  }

  getPurchaseList() : Item[] {
    return _.filter(this.itemList, { shipped: false});
  }

  getUnPurchasedCount() : number {
    return _.filter(this.itemList, { purchased: false }).length;
  }

  getUnShippedCount() : number {
    return _.filter(this.itemList, { purchased: true, shipped: false }).length;
  }

  getTotalAmount() : number {
    return _.reduce(this.itemList, function( sum, o): number{
      return sum + (o.paid?( o.price - o.cost ):0);
    }, 0 );
  }
  
}
