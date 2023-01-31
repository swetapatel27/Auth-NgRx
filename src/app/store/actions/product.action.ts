import { Action } from '@ngrx/store';
import { Product } from 'src/app/models/Product';


export enum ProductActionTypes {
    Load = '[Product] Load',
    LoadSuccess = '[Product] Load Success',
    LoadFail = '[Product] Load Fail',
  }

  export class Load implements Action {
    readonly type = ProductActionTypes.Load;
    constructor() { }
  }
  
  export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
    constructor(public payload: Product[]) { }
  }
  
  export class LoadFail implements Action {
    readonly type = ProductActionTypes.LoadFail;
    constructor(public payload: string) {
    }
  
  }
  
  // Union the valid types
  export type ProductActions = Load
    | LoadSuccess
    | LoadFail
  