import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { User_signup } from "../interfaces/authentication";
import { authAxios } from "../utils/authentication/axiosAuth";
import { UIActions } from "../stores/UI-slice";
import { userActions } from "../stores/user-slice";
import { refreshPage } from "../utils/refreshPage";
import { authenticationActions } from "../stores/authentication-slice";
const uriBase = {
  server: "http://localhost:8080",
};

const uriHeroku = {
  // server: "https://zalando-be.herokuapp.com",
  server: "http://localhost:8080",
};

// request login
export const requestLogin = (
  dispatch: Dispatch,
  user: any,
  navigate: NavigateFunction,
  accessToken: string
  // nameProduct: string
) => {
  try {
    // console.log("hi");
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      // console.log("login");
      const response = await authAxios
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
          dispatch(authenticationActions.loginFail(error.response.data.message));
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
  // try {
  dispatch(UIActions.loadingPage(true));
  setTimeout(async () => {
    await authAxios
      .post(`/v1/auth/register`, user)
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
        setTimeout(() => {
          toast.update(id, { render: error.response?.data.message, type: "error", isLoading: false, autoClose: 1500 });
        }, 1500);
      });
  }, 1000);
};

// request log out
export const requestLogout = (dispatch: Dispatch, navigate: NavigateFunction, accessToken: string) => {
  const authAxios = axios.create({
    baseURL: uriHeroku.server,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  let response;
  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      response = await authAxios.post(`/v1/auth/logout`);
      dispatch(userActions.logoutHandler());
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};
