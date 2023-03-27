import { atom, selector } from "recoil";

export const preference = atom({
  key: "preference",
  default: {
    gender: "",
    age: "",
    price: "",
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
  },
});

export const recommendResult = atom({
  key: "recommendResult",
  default: { recWhiskyResponseDtos: [] },
});
