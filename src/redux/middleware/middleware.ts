import moment from "moment";
import { addCapSo } from "./../slices/capsoSlice";
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { firestore } from "../../firebase/firebase";

let actions: string[] = [];

const actionf = firestore.collection("logger");

const activityLogger: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const state = store.getState() as RootState;
    const currentAccount = state.account.currentAccount;
    switch (action.type) {
      case "capso/addCapSo/fulfilled":
        actionf.add({
          hvten: currentAccount?.hvten,
          grantTime: moment().format("HH:mm DD/MM/YYYY"),
          ip: "126.128.1.121",
          actions: `Cấp số mới ${action.payload.capSo.numberService}`,
        });
        break;
      case "devices/updateDevice/fulfilled":
        actionf.add({
          hvten: currentAccount?.hvten,
          grantTime: moment().format("HH:mm DD/MM/YYYY"),
          ip: "126.128.1.121",
          actions: `Cập nhật thông tin của mã thiết bị ${action.payload.idDevice}`,
        });
        break;
      case "devices/addDevice/fulfilled":
        actionf.add({
          hvten: currentAccount?.hvten,
          grantTime: moment().format("HH:mm DD/MM/YYYY"),
          ip: "126.128.1.121",
          action: `Thêm mới thiết bị ${action.payload.idDevice}`,
        });
        break;
      case "services/addNewService/fulfilled":
        actionf.add({
          hvten: currentAccount?.hvten,
          grantTime: moment().format("HH:mm DD/MM/YYYY"),
          ip: "126.128.1.121",
          actions: `Thêm mới dịch vụ ${action.payload.idService}`,
        });
        break;
      case "services/updateService/fulfilled":
        actionf.add({
          hvten: currentAccount?.hvten,
          grantTime: moment().format("HH:mm DD/MM/YYYY"),
          ip: "126.128.1.121",
          actions: `Cập nhật thông tin của mã dịch vụ ${action.payload.idService}`,
        });
        break;
      default:
        break;
    }
    return next(action);
  };

export default activityLogger;
