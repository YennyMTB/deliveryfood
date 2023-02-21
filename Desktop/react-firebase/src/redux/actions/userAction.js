import { updateProfile, signInWithEmailAndPassword, updatePassword, updateEmail, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { userTypes } from "../types/userTypes";

export const actionSignPhoneAsync = (codigo) => {
  return (dispatch) => {
    const confirmationResult = window.confirmationResult;
    confirmationResult.confirm(codigo)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const { displayName, email, accessToken, phoneNumber, photoURL, uid } = user.auth.currentUser;
        dispatch(
          actionSignPhoneSync({
            name: displayName,
            email,
            accessToken,
            phoneNumber,
            avatar: photoURL,
            uid,
            error: false
          }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          actionSignPhoneSync({ error: true, errorMessage: error.message }))
      })
  }
}

export const actionSignPhoneSync = (user) => {
  return {
    type: userTypes.PHONELOGIN_USER,
    payload: { ...user },
  }
}

export const actionAuthenticationSync = () => {
  return {
    type: userTypes.AUTHENTICATION_USER,
  }
}

export const actionRegisterAsync = ({ email, password, name }) => {
  return async (dispatch) => {
    try {
      await updatePassword(auth.currentUser, password);
      await updateEmail(auth.currentUser, email);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      dispatch(actionRegisterSync({ name, email, password, error: false }))
    } catch (error) {
      dispatch(actionRegisterSync({ error: true, errorMessage: error.message }))
    }
  };
};

const actionRegisterSync = (partialUser) => {
  return {
    type: userTypes.CREATE_USER,
    payload: { ...partialUser },
  };
};

export const actionUserLogOutAsync=()=>{
  return (dispatch)=>{
    signOut(auth)
    .then(()=>{
      dispatch(actionUserLogOutSync())
    })
    .catch((error)=>{console.log(error);})
  }
}
const actionUserLogOutSync=()=>{
  return{
    type:userTypes.LOGOUT_USER,
  }
}

export const loginAsync = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
        const user = response.user;
        dispatch(loginSync({ ...user, error: false }))
      })
      .catch((error) => {
        console.log(error)
        dispatch(loginSync({ error: true }))
      })

  }
}

const loginSync = (user) => {
  return {
    type: userTypes.LOGIN_USER,
    payload: user
  }
}