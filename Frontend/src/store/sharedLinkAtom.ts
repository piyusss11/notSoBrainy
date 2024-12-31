import { atom } from "recoil";

export const sharedLinkAtom = atom<string>({
  key: "sharedLinkAtom",
  default: "",
});
