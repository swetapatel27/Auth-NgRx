import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogOut } from '../store/actions/auth.actions';
import { AppState, selectAuthState } from '../store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  getState: Observable<any>;
  isAuthenticated:boolean = false;
  user:any = null;
  errorMessage = null;
  
  constructor(private store:Store<AppState>){
    this.getState = this.store.select(selectAuthState);
  }


  ngOnInit(){
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      console.log(state);
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
