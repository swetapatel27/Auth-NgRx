import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getProducts(){
    const url = "/api/products"
    return [{name:"ABC",price:12},{name:"mno",price:12}]
  }

}
