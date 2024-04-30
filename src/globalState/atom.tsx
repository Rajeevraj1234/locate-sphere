import { atom } from "recoil";

export const phoneAndEmailReveal = atom<boolean>({
  key: "phoneandemailreveal",
  default: false,
});
