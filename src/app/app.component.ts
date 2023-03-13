import { CartService } from './services/cart.service';
import { Cart } from './pages/models/cart.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cart:Cart = {item : []}
  constructor(private cartService:CartService){}

   ngOnInit(): void {
     this.cartService.cart.subscribe(x=> {
      this.cart =x ;
     })
   }

}
