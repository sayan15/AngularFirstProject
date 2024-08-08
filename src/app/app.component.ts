import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //providers:[ProductService]
})
export class AppComponent {
  constructor(private authService:AuthService){
    this.authService.autoLogin();
  };


}
