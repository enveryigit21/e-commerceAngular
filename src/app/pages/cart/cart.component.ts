import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart.module';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{

  cart:Cart = {
    item: [{
      product: "https://via.placeholder.com/150",
      name: 'snickers',
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: "https://via.placeholder.com/150",
      name: 'snickers',
      price: 150,
      quantity: 3,
      id: 1
    }
  ],

  }

  dataSource : Array<CartItem> = [] ;
  displayedColumns : Array<string> = ["product" , "name" , "price" , "quantity" , "total","action"] ;

  constructor(private cartService : CartService){}

  ngOnInit(): void {
    this.cartService.cart.subscribe((a) => {
      this.cart = a ;
      this.dataSource = this.cart.item;
    })

  }

  getTotal(item : Array<CartItem>) : number {
    return this.cartService.getTotal(item)
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item : CartItem){
     this.cartService.removeFromCart(item);
  }

  onAddQuantity(item :CartItem) {
     this.cartService.addToCart(item);
  }

  onRemoveQuantity(item : CartItem) {
      this.cartService.removeQuantity(item) ;
  }
}
