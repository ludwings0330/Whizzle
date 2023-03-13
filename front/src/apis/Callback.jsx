import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [isStored, setIsStored] = useState(false);

  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");
  const isNew = Boolean(queryParams.get("isNew"));

  console.log(queryParams);

  function settingSuccess() {
    setIsStored(true);
    console.log("세팅 성공");
  }

  function settingFail() {
    setIsStored(true);
    console.log("세팅 실패");
  }

  function setting() {
    try {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      settingSuccess();
    } catch (error) {
      settingFail();
    }
  }

  setting();

  useEffect(() => {
    if (isStored) {
      if (isNew) {
        navigate("/recommend/qeustion");
      } else {
        navigate("/");
      }
    }
  }, [isStored, navigate, isNew]);

  return null;
};

export default Callback;
