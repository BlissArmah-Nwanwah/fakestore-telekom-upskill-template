export class User {
    constructor(
      public email:string,
      public firstName: string,
      public role: string,
      private token: string
    ) {}
  
    get tokens(){
        return this.token
    }
  
  }
  