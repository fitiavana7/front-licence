export interface sideRoutesType{
    label : string ,
    path : string
}

export interface IMetier {
    _id? : string ,
    title : string ,
    description : string ,
    isInDirection  : string
}

export interface IPayment {
    _id? : string ,
    workId : string ,
    employeeId : string,
    companyId : string,
    paymentDate : Date,
    amount : number ,
    commentaire : string ,
    title : string ,
    haveMoins : boolean ,
    moins : number,
    moinsDescription : string,
    havePlus : boolean ,
    plus : number,
    plusDescription : string,
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
    mail : string ,
    hiringDate? : Date ,
    leavingDate? : Date ,
    isCurrentEmployee : boolean
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
    creationDate : Date ,
    mail : string ,
    password? : string
}

export interface ISalary {
    _id? : string,
    userId : string ,
    employeeId : string ,
    workId : string ,
    applicationDate : Date ,
    amount : number ,
    description : string,
}