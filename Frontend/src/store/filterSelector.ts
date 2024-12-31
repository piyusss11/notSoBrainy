import { atom, selector } from "recoil";
import { contentAtom } from "./contentState";

export const filterSelector = selector({
  key: "filterSelector",
  get: ({ get }) => {
    const contents = get(contentAtom);
    const filterType = get(filterTypeAtom);
    if (!filterType) return contents;
    if (!contents) return [];
    return contents.filter((content) => content.typeOfContent === filterType);
  },
});

export const filterTypeAtom = atom<null | string>({
  key: "filterType",
  default: null,
});
