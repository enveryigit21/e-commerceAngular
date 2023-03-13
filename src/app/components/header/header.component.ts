import { CartService } from './../../services/cart.service';
import { Cart, CartItem } from './../../pages/models/cart.module';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private _cart : Cart = {item : []};
  itemsQuantity = 0 ;

  constructor( private cartService : CartService){}

  @Input()
  get cart() : Cart {
    return this._cart
  }

  set cart(cart :Cart) {
     this._cart = cart ;


  this.itemsQuantity  = cart.item
  .map((a) => a.quantity)
  .reduce((prev,current) => prev + current , 0)
  }

  getTotal(item : Array<CartItem>) : number {
    return this.cartService.getTotal(item)
  }

  onClearCart() {
    this.cartService.clearCart();
  }

}

