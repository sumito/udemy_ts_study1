
//decorator
function Logger(logString: string){
  console.log("LOGGER ファクトリ");
  return function( constructor: Function){
    console.log(logString);
    console.log(constructor);  
  }
}

function WithTemplate( template: string,hookId: string ){
  console.log("TEMPLATE ファクトリ"); 
  return function<T extends { new (...args: any[]):{ name: string } }>( originalConstructor: T ){
    return class extends originalConstructor {
      constructor(..._: any[]){
        super();
        console.log("テンプレートを表示");
        const hookEl = document.getElementById(hookId);
        if( hookEl ){
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  }
}


@Logger("ログ出力中...")
@WithTemplate("<h1>Personオブジェクト</h1","app")
class Person {
  name = 'Max';

  constructor(){
    console.log("Personオブジェクト作成中...");
  }
}

//const pers = new Person();
//console.log(pers);


class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price( val:number ){
    if( val > 0 ){
      this._price = val;
    }else{
      throw new Error('不正な価格です。0以下は設定できません。');
    }
  }

  constructor( title:string,price:number ){
    this.title = title;
    this._price = price;
  }

  @Log3
  getPriceWithTax( @Log4 tax:number ){
    return this._price  * ( 1 + tax);
  }
}

//propertyデコレータ
function Log( target: any, propertyName: string | Symbol ){
  console.log("Property デコレータ");
  console.log(target,propertyName);
}
//accessor デコレータ
function Log2( target: any, name: string,descriptor: PropertyDescriptor ){
  console.log("Accessor デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
//methodデコレータ
function Log3( target: any, name: string | Symbol , descriptor: PropertyDescriptor ){
  console.log("Method デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4( target: any, name: string , position: number ){
  console.log("Parameter デコレータ");
  console.log(target);
  console.log(name);
  console.log(position);
}
//const p1 = new Product('Book',1999);
//const p2 = new Product('Book',2999);

function Autobind( _: any,_2: string,descriptor:PropertyDescriptor ){
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable:true,
    enumerable: false,
    get(){
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}

class Printer {
  message = 'クリックしました';

  @Autobind
  showMessage(){
    console.log(this.message);
  }
}

const p = new Printer();
//p.showMessage();

const button = document.querySelector('button')!;
button.addEventListener('click',p.showMessage);
//button.addEventListener('click',function(){console.log("hogehogeh");});


//-------

interface ValidaetorConfig{
  [prop:string]: {
    [validatableProp:string]: string[] //['required','positive']
  }
}
const registerdValidators: ValidaetorConfig = {};

function Required(target: any , propName:string){

  registerdValidators[target.constructor.name] = {
    ...registerdValidators[target.constructor.name],
    [propName]: ['required'],
  };
}

function PositiveNumber(target: any , propName:string){

  registerdValidators[target.constructor.name] = {
    ...registerdValidators[target.constructor.name],
    [propName]: ['positive'],
  };
}

function validate( obj: any ){
  console.log("validate",obj);

  const objValidatorConfig = registerdValidators[obj.constructor.name];

  //console.log("objValidatorConfig",objValidatorConfig);

  if( !objValidatorConfig ){
    return true;
  }

  let isValid = true;
  for( const prop in objValidatorConfig ){

    loop: for( const validator of objValidatorConfig[prop] ){
      switch( validator ){
        case 'required':
          isValid = isValid && !!obj[prop];
          break loop;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break loop;
        }
    }
    return isValid;
  }
}

class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t:string,p:number){
    this.title = t;
    this.price = p;
  }
}
const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit',event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;


  const createdeCourse = new Course(title,price);
  

  if( !validate(createdeCourse) ){
    alert('正しく入力してください。');
    return;
  }

  console.log(createdeCourse);

  
});

