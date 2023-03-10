import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);
  const accessToken = queryParams.get("access_token");
  const refreshToken = queryParams.get("refresh_token");

  // 쿼리 스트링을 통해 access_token과 refresh_token을 sessionStorage에 저장
  const [isStored, setIsStored] = useState(false);
  useEffect(() => {
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
    console.log(`accessToken: ${accessToken}, refreshToken: ${refreshToken}`);
    setIsStored(true);
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (isStored) {
      navigate("/");
    }
  }, [isStored, navigate]);

  return null;
};

export default Callback;
