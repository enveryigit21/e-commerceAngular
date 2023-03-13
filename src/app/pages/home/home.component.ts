import { StoreService } from './../../services/store.service';
import { Product } from './../models/product.module';
import { CartService } from './../../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

  const ROM_HEIGHT : {[id:number] : number} = {1:400 , 3:350 , 4:335};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {

  cols=3;
  rowHeight=ROM_HEIGHT[this.cols]
  category:string | undefined;
  products : Array<Product> | undefined;
  sort= 'desc';
  count = '12' ;
  productSubscription : Subscription | undefined

  constructor(private cartService : CartService , private storeService:StoreService){}
  ngOnInit(): void {
    this.getProducts() ;
  }


   getProducts() {
     this.productSubscription  = this.storeService.getAllProducts(this.count, this.sort , this.category).subscribe(res=> {
      this.products = res ;
    })
   }


  onColumnsCountChange(colsNum: number) {
      this.cols=colsNum;
      this.rowHeight=ROM_HEIGHT[this.cols]
  }

  onShowCategory(newCategory:string):void{
    this.category=newCategory;
    this.getProducts();
  }

  onAddToCart(product:Product){
       this.cartService.addToCart({
        product: product.image,
        name: product.title,
        price : product.price,
        quantity : 1 ,
        id:product.id
       })
  }
  onItemsCountChange(newCount : number) {
      this.count = newCount.toString();
      this.getProducts();
  }


  onSortChange(newSort : string) {
     this.sort = newSort ;
     this.getProducts();
  }

   ngOnDestroy(): void {
     if(this.productSubscription) {
      this.productSubscription.unsubscribe();
     }
   }


}
