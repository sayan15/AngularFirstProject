import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root',
})
export class LoggerServivce{
    logInformatioon(message:string){
        console.warn("Custom Log " + message);
    }
}