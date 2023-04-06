import { useSetRecoilState } from "recoil";
import { userState } from "../store/userStore";
import { preference, recommendResult } from "../store/indexStore";

function Logout() {
  const setUser = useSetRecoilState(userState);
  const setPref = useSetRecoilState(preference);
  const setRecResult = useSetRecoilState(recommendResult);

  const logout = () => {
    // 토큰 삭제
    localStorage.clear();

    // useState 초기화
    setUser({
      id: 0,
      exp: 0,
      nickname: "",
      email: "",
      provider: "",
      image: {
        url: "",
        originName: "",
      },
      level: 0,
    });

    setPref({
      gender: "",
      age: "",
      priceTier: 0,
      isExperience: "",
      whiskies: [],
      flavor: {
        smoky: 0,
        peaty: 0,
        spicy: 0,
        herbal: 0,
        oily: 0,
        body: 0,
        rich: 0,
        sweet: 0,
        salty: 0,
        vanilla: 0,
        tart: 0,
        fruity: 0,
        floral: 0,
      },
    });

    setRecResult([]);
  };

  return logout;
}

export default Logout;
