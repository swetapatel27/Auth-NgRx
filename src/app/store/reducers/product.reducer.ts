import { Product } from "src/app/models/Product";
import { ProductsComponent } from "src/app/products/products.component";
import { ProductActions, ProductActionTypes } from "../actions/product.action";

export interface ProductState {
    products: Product[],
    loaded: boolean;
    error: string
  }

  const initialState: ProductState = {
    products: [],
    loaded: false,
    error: ''
  };

  export function ProductReducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {
  case ProductActionTypes.LoadSuccess:
    console.log("reducer called")
    console.log(...action.payload);
    
    return {
      ...state,
      products: [...action.payload],
      loaded: true,
      error: ''
    }

  default:
        return state
    }
  }