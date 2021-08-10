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
    public get_json(){
        return JSON.stringify({
            username: this.username,
            password:this.password,
            email:this.email,
            token:this.token
        });
    }
    
    // public static jsonToObject( data:JSON){

    //     let variable = new User(data[nombre],data[password],data[email],data[_id]);
    //     return variable;
    // }
    
}