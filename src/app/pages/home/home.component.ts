import { Product } from './../models/product.module';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

  const ROM_HEIGHT : {[id:number] : number} = {1:400 , 3:350 , 4:335};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cols=3;
  rowHeight=ROM_HEIGHT[this.cols]
  category:string | undefined;

  constructor(private cartService : CartService){}
  ngOnInit(): void {

  }

  onColumnsCountChange(colsNum: number) {
      this.cols=colsNum;
      this.rowHeight=ROM_HEIGHT[this.cols]
  }

  onShowCategory(newCategory:string):void{
    this.category=newCategory;
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
}
