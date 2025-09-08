import { useDispatch } from "react-redux";
import axios from "axios";
import { buildFormData } from "../Utils/helper";
import {
  setData,
  setRoles,
  setToken,
  logout as logoutAction,
} from "../Store/actions";

import { logout } from "./Api";

export const useLogin = () => {
  const dispatch = useDispatch();
  const login = async (route, params = {}) => {
    try {
      // console.log("route", route);
      // console.log(route, "lllllllllllllllll");
      // const getRole = route.split("/")[1];
      const fd = new FormData();
      buildFormData(fd, params);
      const response = await axios.post(route, fd);
      console.log("login response", response?.data?.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response?.data?.token}`;
      // const {
      //   data: { detail: user },
      // } = await axios.get(`/${getRole}/account`);
      // const { shop_count = 0, bank_count = 0, subscriptions_count = 0 } = user;
      dispatch(setToken(response?.data?.token));
      dispatch(setRoles(response?.data?.user?.type === "service_provider" ? "provider" : response?.data?.user?.type));
      dispatch(setData(response?.data?.user));
      return response;
    } catch (error) {
      console.log(error);
      console.log('Error:', error.response ? error.response.data?.message : error.message);
      return error.response ? error.response.data : { message: 'Unknown error occurred' };
    }
  };

  return login;
};
export const useLogout = () => {
  const dispatch = useDispatch();
  const handleLogout = async (role) => {
    try {
      // await logout(`/${role}-api/auth/logout`);
      setTimeout(() => {
        localStorage.removeItem("persist:root");
        localStorage.clear();
        dispatch(logoutAction());
        dispatch(setToken());
        dispatch(setRoles());
        dispatch(setData());
      }, 1000);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return handleLogout;
};
