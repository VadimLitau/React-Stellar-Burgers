import {
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAILED,
  USER_FORGOT_SUCCESS,
  USER_FORGOT_REQUEST,
  USER_FORGOT_FAILED,
  USER_AUTHORIZATION_SUCCESS,
  USER_AUTHORIZATION_REQUEST,
  USER_AUTHORIZATION_FAILED,
  USER_LOGOUT,
  UPDATE_USER_PROFILE,
  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAILED,
} from "../constants/route";
import { IRouteuserAuthProfile } from "../types/route";
import { TRouteActions } from "../actions/route";
type TRouteState = {
  userRegistrationSuccess: boolean;
  userRegistrationRequest: boolean;
  userRegistrationFailed: boolean;
  userForgotPasswordSuccess: boolean;
  userForgotPasswordRequest: boolean;
  userForgotPasswordFailed: boolean;
  userAuthorizationRequest: boolean;
  userAuthorizationSuccess: boolean;
  userAuthorizationFailed: boolean;
  userResetPasswordRequest: boolean;
  userResetPasswordSucces: boolean;
  userResetPasswordFailed: boolean;
  userAuth: boolean;
  userAuthProfile: IRouteuserAuthProfile;
  newUserProfile: null | IRouteuserAuthProfile;
  user: IRouteuserAuthProfile;
};

export const routeState: TRouteState = {
  userRegistrationSuccess: false,
  userRegistrationRequest: false,
  userRegistrationFailed: false,
  userForgotPasswordSuccess: false,
  userForgotPasswordRequest: false,
  userForgotPasswordFailed: false,
  userAuthorizationRequest: false,
  userAuthorizationSuccess: false,
  userAuthorizationFailed: false,
  userResetPasswordRequest: false,
  userResetPasswordSucces: false,
  userResetPasswordFailed: false,
  userAuth: false,
  user: { name: "", email: "", password: "" },
  userAuthProfile: { name: "", email: "", password: "" },
  newUserProfile: null,
};

export const routeReducer = (
  state = routeState,
  action: TRouteActions
): TRouteState => {
  switch (action.type) {
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        userRegistrationRequest: true,
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        userRegistrationRequest: false,
        userRegistrationSuccess: true,
        newUserProfile: {
          name: action.data.user.name,
          email: action.data.user.email,
          password: action.data.user.password,
        },
      };
    }
    case USER_REGISTER_FAILED: {
      return {
        ...state,
        userRegistrationRequest: false,
        userRegistrationFailed: true,
      };
    }
    case USER_FORGOT_REQUEST: {
      return {
        ...state,
        userForgotPasswordRequest: true,
      };
    }
    case USER_FORGOT_SUCCESS: {
      return {
        ...state,
        userForgotPasswordSuccess: true,
        userForgotPasswordRequest: false,
      };
    }
    case USER_FORGOT_FAILED: {
      return {
        ...state,
        userForgotPasswordRequest: false,
        userForgotPasswordFailed: true,
      };
    }
    case USER_AUTHORIZATION_REQUEST: {
      return {
        ...state,
        userAuthorizationRequest: true,
        userAuth: false,
      };
    }
    case USER_AUTHORIZATION_SUCCESS: {
      const { email, password, name } = action.payload;
      return {
        ...state,
        userAuthorizationRequest: false,
        userAuthorizationSuccess: true,
        userAuth: true,
        userAuthProfile: {
          ...state.user,
          email: email,
          name: name,
          password: password,
        },
      };
    }
    case USER_AUTHORIZATION_FAILED: {
      return {
        ...state,
        userAuthorizationRequest: false,
        userAuthorizationFailed: true,
        userAuth: false,
      };
    }
    case USER_RESETPASSWORD_REQUEST: {
      return {
        ...state,
        userResetPasswordRequest: true,
      };
    }
    case USER_RESETPASSWORD_SUCCESS: {
      return {
        ...state,
        userResetPasswordRequest: false,
        userResetPasswordSucces: true,
      };
    }
    case USER_RESETPASSWORD_FAILED: {
      return {
        ...state,
        userResetPasswordRequest: false,
        userResetPasswordFailed: true,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        userAuthorizationSuccess: false,
        userAuth: false,
        userAuthProfile: {
          name: "",
          email: "",
          password: "",
        },
      };
    }
    case UPDATE_USER_PROFILE: {
      const { email, name, password } = action.payload;
      return {
        ...state,
        userAuthProfile: {
          ...state.userAuthProfile,
          email: email,
          name: name,
          password: password,
        },
      };
    }
    default: {
      return state;
    }
  }
};
