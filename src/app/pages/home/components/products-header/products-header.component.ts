import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent implements OnInit {

  @Output() columnsCountChange = new EventEmitter<number>

  sort="desc";
  itemShowCount=12;

  ngOnInit(): void {

  }
// void birşey dönmeyecek sadece bu değişkeni güncelleyecek
  onSortUpdated(newSort:string) :void {
     this.sort=newSort;

  }

  onItemsUpdate(count:number) : void {
 this.itemShowCount=count
  }

  onColumnsUpdated(colsNum : number) : void {
   this.columnsCountChange.emit(colsNum);
  }

}
