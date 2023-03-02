

abstract class Department {
  //private name: string;
  protected employees: string[] = [];

  static fiscalYear = 2023;

  constructor( protected readonly id: string,public name: string){
  }

  abstract describe(this: Department) :void;


  addEmloyee( employee: string ){
    this.employees.push(employee);
  }

  printEmployeee(){
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee( name: string ){
    return { name: name };
  }

}

class ITDepartment extends Department {

  admins: string[];

  constructor( id:string,admins:string[] ){
    super(id,"IT");
    this.admins = admins;

  }
  describe() {
      console.log("IT部門 - id : " + this.id );
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport(){
    if( this.lastReport ){
      return this.lastReport;
    }
    throw new Error('レポートが見つかりません');
  }

  set mostRecentReport( value: string){
    if( !value ){
      throw new Error('正しい値を入力しｋてください。');
    }
    this.addReport(value);
  }

  describe(){
    console.log("会計部門 - ID: "+this.id);
  }

  constructor( id: string, private reports: string[] ){
    super(id,'IT');
    this.lastReport = reports[0];
  }

  addReport( text: string ){
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports(){
    console.log(this.reports);
  }

  addEmloyee(name: string): void {
      if( name === 'Max' ){
        return;
      }
      this.employees.push(name);
  }
}

class Hoge{
  private static instance: Hoge;

  private constructor(){
  }
  
  static getInstance(){
    if( this.instance ){
      return this.instance;
    }
    this.instance = new Hoge();
    return this.instance;
  }
}


//main proc


const hoge1 = Hoge.getInstance();
console.log(hoge1);
const hoge2 = Hoge.getInstance();
console.log(hoge2);


const employee1 = Department.createEmployee('Max');
console.log(employee1);
console.log(Department.fiscalYear);


const accounting = new ITDepartment("1",["Max"]);

accounting.describe();
accounting.addEmloyee("Max");
accounting.addEmloyee("Emily");
accounting.printEmployeee();

const it = new ITDepartment('it1',['Max']);
it.describe();

console.log(it);


const ad = new AccountingDepartment('d2',[]);
ad.describe();
ad.addReport("Something Report");
ad.mostRecentReport = 'Hogehoge Report';
ad.printReports();
console.log(ad.mostRecentReport);
ad.addEmloyee('Max');
ad.addEmloyee('Mary');
ad.printEmployeee();




