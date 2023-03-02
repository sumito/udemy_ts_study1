
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


function addCombine( a: Combinable,b:Combinable ){
  if( typeof a === 'string' || typeof b === 'string' ){
    return a.toString() + b.toString();
  }
  return a + b;
}








//discriminated unions
