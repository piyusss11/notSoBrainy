import { atom } from "recoil";

export const sharedBrainContentAtom = atom<string[]>({
    key: "sharedBrainContentAtom",
    default: [],
});