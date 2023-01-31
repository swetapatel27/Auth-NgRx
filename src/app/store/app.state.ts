import * as auth from './reducers/auth.reducers';
import * as product from './reducers/product.reducer';
import { createFeatureSelector, createSelector, provideState } from '@ngrx/store';

export interface AppState {
    authState: auth.State;
  }

export interface ProductState{
  productState:product.ProductState
}

export const reducers = {
    auth: auth.reducer,
  
  };

export const productReducer = {
  product:product.ProductReducer
}


export const selectProductState = createFeatureSelector<ProductState>('Product');

export const getProducts = createSelector(
  
  selectProductState,
  (state:any) => {
    // debugger;
    console.log("getproducts",selectProductState);
    return state.products;
  }
)

export const getLoaded = createSelector(selectProductState,(state)=>{
  console.log("from getloaded",state)
  return state.productState.loaded
})

  export const selectAuthState = createFeatureSelector<AppState>('auth');
  

  

