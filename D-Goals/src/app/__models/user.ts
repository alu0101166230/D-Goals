export class User {
    username: string;
    password: string;
    email: string;
    token?: string;
    constructor(user:string,pass:string,mail:string,token:string){
        this.username=user;
        this.password=pass;
        this.email=mail;
        this.token=token;
    }
    public get name(): User{
        return this.name;
    }
}