import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ICurrentUser, IUser } from "../_models/user.model";
import { BehaviorSubject } from "rxjs";

const BASE_URL='https://identitytoolkit.googleapis.com/v1/accounts';
const API_KEY='AIzaSyALb886b6v1xnqI55uG8oonmBNuv7tgqTo';


@Injectable({
    providedIn:'root'
})
export class AuthService{

    private currentUserSource=new BehaviorSubject<ICurrentUser|null>(null);
    currentUser$=this.currentUserSource.asObservable();

    constructor(private http:HttpClient,private router:Router){}

    register(user:IUser){
        let registerModel={
            email:user.emailAddress,
            password:user.password,
            returnSecureToken:true,
        };
    
        this.http.post(BASE_URL+':signUp?key='+API_KEY,registerModel).subscribe((responseData:ICurrentUser)=>{
            const user={
                idToken:responseData.idToken,
                email:responseData.email,
                refreshToken:responseData.refreshToken,
                expiresIn:responseData.expiresIn
            }
            this.currentUserSource.next(user);
            this.setLocalStorage(user);
            this.router.navigate(['/']);
        });
    }

    login(user:IUser){
        let loginModel={
            email:user.emailAddress,
            password:user.password,
            returnSecureToken:true,
        };
    
        this.http.post(BASE_URL+':signInWithPassword?key='+API_KEY,loginModel).subscribe((responseData:ICurrentUser)=>{
            const user={
                idToken:responseData.idToken,
                email:responseData.email,
                refreshToken:responseData.refreshToken,
                expiresIn:responseData.expiresIn
            }
            this.currentUserSource.next(user);
            this.setLocalStorage(user);
            this.router.navigate(['/']);
        });
    }

    logout(){
        this.removeLocalStorage();
        this.currentUserSource.next(null);
    }

    autoLogin(){
        var user:ICurrentUser=JSON.parse(localStorage.getItem('user'));
        if(user){
            this.currentUserSource.next(user);
        }
    }

    setLocalStorage(user:ICurrentUser){
        localStorage.setItem('user',JSON.stringify(user));
    }

    removeLocalStorage(){
        localStorage.removeItem('user');
    }
}