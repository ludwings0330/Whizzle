import {toast} from "react-toastify";

const option = { position:"bottom-right", pauseOnHover: false, autoClose: 2000 }

export const success = (msg) => toast.success(msg, option);

export const error = (msg) => toast.error(msg, option);

export const warning = (msg) => toast.warning(msg, option);

export const info = (msg) => toast.info(msg, option);