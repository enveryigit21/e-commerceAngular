import { Cart, CartItem } from './../pages/models/cart.module';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({item : [

  ]})

  constructor(private _snackBar : MatSnackBar) { }


  removeQuantity(item : CartItem) {
    let itemForRemoval : CartItem | undefined

     let filteredItems =  this.cart.value.item.map((r) => {
      if(r.id == item.id) {
        r.quantity--;
        if(r.quantity == 0) {
          itemForRemoval = r ;
        }
      }
      return r ;
    });

    if(itemForRemoval) {
      filteredItems =  this.removeFromCart(itemForRemoval,false)
    }
    this.cart.next({item : filteredItems})
    this._snackBar.open('1 item removed from cart.' , ' Ok ', {duration :3000 })
   }





  addToCart(itemx : CartItem) : void  {
    const item = [...this.cart.value.item];

    const itemsInCart = item.find((x) => x.id === itemx.id)
    if(itemsInCart) {
      itemsInCart.quantity +=1
    }else {
      item.push(itemx)
    }

    this.cart.next({item});
    this._snackBar.open('1 item added to cart.', 'OK' ,  {duration:3000}) ;
    console.log(this.cart.value)
  }

  getTotal(item : Array<CartItem>) : number {
    return item.
    map((x)=> x.price * x.quantity)
    .reduce((prev,current)=> prev + current ,0)
  }

  clearCart(){
  this.cart.next({item : []});
  this._snackBar.open('Cart is cleared' , ' OK ' , {duration:3000})
  }

  removeFromCart(item:CartItem , update = true)  : Array<CartItem>{
  const filteredItems =   this.cart.value.item.filter((x)=> x.id !== item.id);

  if(update){
    this.cart.next({item : filteredItems});
  this._snackBar.open('1 item removed from cart','OK' , {duration:3000})
  }


  return filteredItems;

  }


}
