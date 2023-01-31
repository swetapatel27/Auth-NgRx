// import { act } from "@ngrx/effects";
import { User } from "src/app/models/User";
import { All, AuthActionTypes } from "../actions/auth.actions";



export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
  }

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };


  export function reducer(state = initialState, action: All): State {
    switch (action.type) {
      case AuthActionTypes.LOGIN_SUCCESS: {
        console.log("called from reduces"+ {...state})
        return {
          ...state,
          isAuthenticated: true,
          user: {
            token: action.payload.token,
            email: action.payload.email
          },
          errorMessage: null
        };
      }
      case AuthActionTypes.LOGIN_FAILURE: {
        console.log("reducer failed",action.payload['error']['message']);
        return {
          ...state,
          errorMessage: action.payload['error']['message']
        };
    }
    case AuthActionTypes.SIGNUP_SUCCESS:{
      return {
        ...state,
        isAuthenticated:true,
        user:{
          token:action.payload.token,
          email:action.payload.email
        },
        errorMessage:null
      }
    }

    case AuthActionTypes.SIGNUP_FAILURE:{
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }

    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

      default: {
        return state;
      }
    }
  }