import { Subscription } from 'rxjs';
import { StoreService } from './../../../../services/store.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit , OnDestroy{

  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription : Subscription | undefined;
  categories:Array<string> | undefined;

  constructor(private storeService : StoreService){}
  ngOnInit(): void {
   this.categoriesSubscription =  this.storeService.getAllCategories().subscribe((res)=> {
      this.categories  = res ;
    });
  }

  onShowCategory(category:string) : void {
   this.showCategory.emit(category);

  }


  ngOnDestroy(): void {
     if(this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
     }
  }


}
