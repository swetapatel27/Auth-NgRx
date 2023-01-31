import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/app.state';
import * as fromProduct from '../store/app.state';
import * as productActions from '../store/actions/product.action';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Component({
  selector: 'app-test-product',
  templateUrl: './test-product.component.html',
  styleUrls: ['./test-product.component.css']
})
export class TestProductComponent implements OnInit {
  
  products:Observable<any[]> ;
  errorMessage: string | null='';

  constructor(private store:Store<ProductState>){

    this.products = this.store.select(fromProduct.getProducts);
    console.log("cons",this.products);

  }
  
  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());
    console.log("onini");
   
     this.store.select(fromProduct.getProducts).subscribe(res=>{
      console.log("res",res);
      
      this.products = res;
      console.log(this.products)
    });
  }

}
