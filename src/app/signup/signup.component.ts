import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { SignUp } from '../store/actions/auth.actions';
import { AppState, selectAuthState } from '../store/app.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null='';



  constructor(private store: Store<AppState>){
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload  = {
      firstname:"abc",
      lastname:'mno',
      email: this.user.email,
      password: this.user.password,
      confirmpassword:this.user.password
    }
    this.store.dispatch(new SignUp(payload))
    
    // console.log(this.user);

  }


}
