import { HttpClient } from '@angular/common/http';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart.module';
import { loadStripe } from '@stripe/stripe-js';

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

  constructor(private cartService : CartService , private httpClient : HttpClient){}

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

  onCheckout() {
      this.httpClient.post("http://localhost:4242/checkout" , {
        items : this.cart.item
      }).subscribe(async(res:any) => {
        // bu töntem stripe apisinin kullanmaya hazır olmadan önce beklemek gerekir. bu nedenle await kullanarak loadStripın tamamlanmasını bekler
        let stripe = await loadStripe     ('pk_test_51MgvEjIaIBSDV6EKodfi9Og3E0fCKbWd84FYoSL6w18bcD0zUJIsUC35BQn68gdhFD8PSDvX5dzviTk9cKNGfxzT00ZO3ctFNt')
        stripe?.redirectToCheckout({
          sessionId: res.id // oturum kimliğini göderir
        })
      })
  }

}
