import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect , ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
    AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure,
  } from '../actions/auth.actions';

import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}


  LogIn = createEffect(
    ()=>this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action:LogIn)=>action.payload),
        switchMap(payload=>{
            return this.authService.logIn(payload.email,payload.password).pipe(
                map((user)=>{
                    console.log(user);
                    return new LogInSuccess({token:user.token,email:payload.email});
                }),
                catchError((error)=>{
                    console.log("error passed-->",error['error']);
                    return of(new LogInFailure({ error: error['error'] }));
                })
            )
        })
    )
 )

 LogInSuccess:Observable<any> = createEffect(
    ()=>this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap(({ type, payload})=>{
            console.log("==>",payload['token']['token']);
            localStorage.setItem('token',  payload['token']['token'] ||'');
            this.router.navigateByUrl('/');
        })
    ) 
    ,{dispatch:false}
 );


 LogInFailure = createEffect(
    ()=>this.actions.pipe(
        
        ofType(AuthActionTypes.LOGIN_FAILURE),
        map((data)=>{console.log("login Failer effect called"+JSON.stringify(data));})
    ),
    { dispatch: false }
 )


 SignUp = createEffect(
    ()=>this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP),
        map((action:SignUp)=>action.payload),
        switchMap(payload=>{
            console.log("Payload from signup",payload);
            return this.authService.signUp(payload)
            .pipe(
                map((user)=>{
                console.log(user);
                return new SignUpSuccess({token:user.token,email:payload.email})
            }),
            catchError((error)=>{
                console.log(error);
                return of(new SignUpFailure({ error: error['error'] }))
            })
            )
        })
    )
 )

 SignUpSuccess=createEffect(
    ()=>
        this.actions.pipe(
            ofType(AuthActionTypes.SIGNUP_SUCCESS),
            tap(({ type, payload})=>{
                console.log("==>",payload['token']['token']);
                localStorage.setItem('token',  payload['token']['token'] ||'');
                this.router.navigateByUrl('/');
            })
        ),
        {dispatch:false}   
 )

 SignUpFailure = createEffect(
    ()=>
    this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    ),
    {dispatch:false}
 )


 LogOut = createEffect(
    ()=>
    this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user)=>{
            localStorage.removeItem('token');
        })
        
    ),
    {dispatch:false}
 )
  // effects go here

}