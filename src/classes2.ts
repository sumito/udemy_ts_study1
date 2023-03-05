
//intersection types:交差型

type Admin = {
  name: string;
  privileges: string[];
}
type Employee = {
  name: string;
  startDate: Date;
}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges:['Create-server'],
  startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;


// to inteface
/*
interface Admin {
  name: string;
  privileges: string[];
}
interface Employee{
  name: string;
  startDate: Date;
}
interface ElevatedEmployee extends Admin,Employee {};
*/

//type guards:型ガード


function addCombine( a: number,b: number): number; //function overload
function addCombine( a: string,b: string): string; //function overload
function addCombine( a: number,b: string): string; //function overload
function addCombine( a: string,b: number): string; //function overload
function addCombine( a: Combinable,b:Combinable ){
  if( typeof a === 'string' || typeof b === 'string' ){
    return a.toString() + b.toString();
  }
  return a + b;
}




type UnknownEmployee = Employee | Admin;

function printEmployeeInformation( emp: UnknownEmployee ){
  //console.log(emp);

  if( 'privileges' in emp ){
    console.log("Privileges: " + emp.privileges);
  }
  if( 'startDate' in emp ){
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({name: 'Max',startDate: new Date()});

class Car {
  drive(){
    console.log("運転中...");
  }
}

class Truck {
  drive(){
    console.log("トラックを運転中...");
  }
  loadCargo( amount: number ){
    console.log("荷物を載せています..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle( vehicle : Vehicle ){
  vehicle.drive();
 //if( 'loadCargo' in vehicle ){
  if( vehicle instanceof Truck ){
      vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);


//discriminated unions: 判別可能なUnion型

interface Bird{
  type: 'bird',
  flyingSpeed:number;
}
interface Horse{
  type: 'horse',
  runningSpeed:number;
}

type Animal = Bird | Horse;

function moveAnimal( animal: Animal ){
  
  let speed;
  switch( animal.type ){
     case 'bird':
      speed = animal.flyingSpeed;
      break;
     case 'horse':
      speed = animal.runningSpeed
  }
  console.log("移動速度："+speed);
}

moveAnimal({type: 'bird',flyingSpeed:1000});
moveAnimal({type: 'horse',runningSpeed:20});


//type casting

//const paragraph = document.querySelector('p');
//const userInputElement = <HTMLInputElement>document.getElementById('user-input');
const userInputElement = document.getElementById('user-input');
if( userInputElement ){
  //userInputElement.value = 'こんにちは';
  ((userInputElement) as HTMLInputElement).value = 'こんにちは';
}


//index type

interface ErrorContainer {
  [prop: string]:string;
}

const errorBag: ErrorContainer = {
    email: '正しいメールアドレスではありません。',
}

//null 合体演算子

const userInput = '';

const StoredData = userInput ?? 'DEFAULT';

console.log( StoredData );




