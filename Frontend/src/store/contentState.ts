import { atom } from "recoil";
import { MyContent } from "../types/myTypes";


export const contentAtom = atom<MyContent[] | undefined>({
  key: "contentAtom",
  default: [],
});

