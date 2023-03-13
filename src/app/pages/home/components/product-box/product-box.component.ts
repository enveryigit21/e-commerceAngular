import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/pages/models/product.module';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode=false;


  product : Product | undefined = {
    id: 1 ,
  title: 'Snickers',
  price : 150 ,
  category:'Shoes',
  description: 'Description',
  image: "https://via.placeholder.com/150"
  }

  @Output() addToCart = new EventEmitter() ;

  constructor(){}
  ngOnInit(): void {

  }

  onAddToCart() {
        this.addToCart.emit(this.product)
  }

}
