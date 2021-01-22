export class User {
    public username: string;
    public password: string;
    public email: string;
    public token?: string;
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