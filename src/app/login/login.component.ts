import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { LogIn } from '../store/actions/auth.actions';
import { AppState, selectAuthState } from '../store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null = '';


  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);

   }

  ngOnInit() {
    this.getState.subscribe((state) => {
      console.log("oninit State",state);
      this.errorMessage = state.errorMessage;
    });
  }
  

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}
