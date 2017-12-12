// import { File } from '@ionic-native/file';

export class Item {
  name : string;
  owner : string;
  paid : boolean;
  cost : number;
  price : number;

  private constructor() {};

  static createItem ( name:  string  = '', 
                      owner: string  = '', 
                      paid:  boolean = false, 
                      cost:  number  = null, 
                      price: number  = null ): Item {
    let item = new Item();
    item.name = name;
    item.owner = owner;
    item.paid = paid;
    item.cost = cost;
    item.price = price;
    return item;
  }
}

export class Utils {
  // constructor(private file: File) {}
  public itemList: Item[] = [];

  constructor() {
  };

  loadTestFile(){
    this.itemList.push(Item.createItem('airpods','Jesse',false,160,200));
    this.itemList.push(Item.createItem('iphoneX','Lucy',false,1150,1200));
    this.itemList.push(Item.createItem('ipad','Larry',false,350,400));
  }
  
}
