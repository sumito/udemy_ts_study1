//generics

/*
const names: Array<string> = [];


const promise = new Promise<any>( (resoleve,reject) => {
  setTimeout( () => {
    resoleve(10);
  },2000
  );

});
promise.then( data => {
  data.Split(' ');
});
*/
/*
function merge<T extends {},U>( objA: T,objB: U ){
  return Object.assign(objA,objB);
}


const mergeObj = merge( {name:'Max'},{age:30} );
console.log(mergeObj.age);
*/


interface Lengthy{
  length:number;
}

function countAndDescribe<T extends Lengthy>( element: T ){
  let descriptionText = '値がありません。';
  if( element.length > 0 ){
    descriptionText = '値は' + element.length + '個です';
  }
  return [element,descriptionText];
}

console.log(countAndDescribe('お疲れ様です！'));


function extractAndConvert<T extends object,U extends keyof T>( obj: T,key: U ){
  return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name:'Max'},"name"));


//generics class
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T){
    this.data.push(item);
  }

  removeItem(item: T){
    if( this.data.indexOf(item) === -1 ){
      return;
    }
    this.data.splice(this.data.indexOf(item),1);
  }

  getItems(){
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Data1");
textStorage.addItem("Data2");
textStorage.removeItem("Data2");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.removeItem(10);
console.log(numberStorage.getItems());



//const objStorage = new DataStorage<object>();
//const obj1 = {  name: 'Max'};
//const obj2 = {  name: 'Manu'};
//objStorage.addItem(obj1);
//objStorage.addItem(obj2);
//objStorage.removeItem(obj1);
//console.log(objStorage.getItems());




