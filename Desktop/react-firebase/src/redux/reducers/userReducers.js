import { userTypes } from "../types/userTypes";

export const userReducers = (state = {}, action) => {
  switch (action.type) {
    case userTypes.PHONELOGIN_USER:
      return {
        ...action.payload
      }

    case userTypes.AUTHENTICATION_USER:
      return {
        ...state,
        authentication: true
      }

    case userTypes.CREATE_USER:
      return {
        ...state,
        ...action.payload
      };

    case userTypes.LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
      
    case userTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
