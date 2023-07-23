import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { User_signup } from "../interfaces/authentication";
import { authAxios, uriBase } from "../utils/authentication/axiosAuth";
import { UIActions } from "../stores/UI-slice";
import { userActions } from "../stores/user-slice";
import { authenticationActions } from "../stores/authentication-slice";

// request login
export const requestLogin = (
  dispatch: Dispatch,
  user: any,
  navigate: NavigateFunction,
  accessToken: string
  // nameProduct: string
) => {
  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      await authAxios
        .post(`/v1/auth/login`, user)
        .then((data) => {
          dispatch(userActions.loginHandler(data.data));
          localStorage.setItem("User", JSON.stringify(data.data));
        })
        .then(() => {
          navigate("/");
          // refreshPage();
        })
        .catch((error) => {
          dispatch(authenticationActions.loginFail(error.response.data ? error.response.data.message : ""));
        });
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

// request register
export const requestSignup = (dispatch: Dispatch, user: User_signup, navigate: NavigateFunction) => {
  const id = toast.loading("Please wait...");
  // const params = new URLSearchParams(user);
  // params.append("extraparam", "value");
  try {
    dispatch(UIActions.loadingPage(true));

    setTimeout(async () => {
      await authAxios
        .post(`/v1/auth/register`, JSON.stringify(user))
        .then((res) => {
          setTimeout(() => {
            toast.update(id, { render: res.data.message, type: "success", isLoading: false, autoClose: 1500 });
          }, 1500);
        })
        .then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 1500);
          dispatch(UIActions.loadingPage(false));
        })
        .catch((error) => {
          const err = error.response.data ? error.response.data.message : "Something went wrong";
          dispatch(authenticationActions.signupFail(err));
          toast.update(id, {
            render: err,
            type: "error",
            isLoading: false,
            autoClose: 1500,
          });
        });
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

// request log out
export const requestLogout = (dispatch: Dispatch, navigate: NavigateFunction, accessToken: string) => {
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    // withCredentials: true,
  });
  // let response;
  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      await authAxios.post(`/v1/auth/logout`);
      dispatch(userActions.logoutHandler());
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};
