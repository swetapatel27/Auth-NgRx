import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { Product } from '../models/Product';
import * as productActions from '../store/actions/product.action';
import * as fromProduct from '../store/app.state';
import { ProductState, } from '../store/reducers/product.reducer';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  

  products:any = []
  errorMessage: string | null='';

  constructor(private store:Store<ProductState>){
    // console.log("constructor",this.store.select(fromProduct.selectProductState));
    this.products = this.store.select(fromProduct.selectProductState);
    console.log("cons",this.products);

  }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());
    console.log("onini");
     this.store.select(fromProduct.getProducts).subscribe(res=>{
      this.products = res;
    });
    // this.products$ = this.store.pipe()
    
  }


}
