export interface sideRoutesType{
    label : string ,
    path : string
}

export interface IMetier {
    _id? : string ,
    title : string ,
    salary : number ,
    description : string 
}

export interface IEmployee {
    _id ?: string ,
    firstName : string ,
    lastName : string ,
    age : number ,
    gender : string ,
    adress : string,
    phone : string,
    matrimoniale : string ,
    mail : string
}

export interface ILogin {
    mail : string ,
    password : string
}

export interface ICompany {
    _id? : string,
    name : string ,
    location : string ,
    phone : string ,
    creationDate : string ,
    mail : string ,
    password? : string
}

export interface ISalary {
    _id? : string,
    userId : string ,
    employeeId : string ,
    workId : string ,
    applicationDate : string ,
    amount : number ,
    description : string
}