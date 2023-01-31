import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect , ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { empty, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { LogIn } from '../actions/auth.actions';
import * as fromProduct from "../app.state";
import {ProductActions} from "../actions/product.action";

import { ProductActionTypes,Load,LoadFail,LoadSuccess } from '../actions/product.action';

@Injectable()
export class ProductEffects {

    constructor(
        private actions: Actions,
        private productService: ProductService,
        private router: Router,
        private store: Store<any>
      ) {}

Load = createEffect(
    ()=>this.actions.pipe(
        
        ofType(ProductActionTypes.Load),
        // withLatestFrom(this.store.pipe(select(fromProduct.getLoaded))),
        switchMap(()=>{
            console.log("effectcalled");
            return of(this.productService.getProducts()).pipe(
                map((data:any) => {
                    console.log("from service call",data)
                    return new LoadSuccess(data);
                  }),
                  catchError(err => of(new LoadFail(err)))
            )
        })
        )
    )

}


