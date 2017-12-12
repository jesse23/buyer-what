// import { File } from '@ionic-native/file';

export class Item {
  name : string;
  owner : string;
  cost : number;
  price : number;

  paid : boolean;
  purchased: boolean;
  sent: boolean;

  private constructor() {};

  static createItem ( name:       string  = '', 
                      owner:      string  = '', 
                      cost:       number  = null, 
                      price:      number  = null,
                      paid:       boolean = false, 
                      purchased:  boolean = false, 
                      sent:       boolean = false 
                    ): Item {
    let item = new Item();
    item.name = name;
    item.owner = owner;
    item.cost = cost;
    item.price = price;
    item.paid = paid;
    item.purchased = purchased;
    item.sent = sent;
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
  
}
