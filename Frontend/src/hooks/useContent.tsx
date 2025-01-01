import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { contentAtom } from "../store/contentState";

const useContent = () => {
  const setContent = useSetRecoilState(contentAtom);
  const getContent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/content/getMyContent`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setContent(response?.data?.getMycontents);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // const interval = setInterval(() => {
    //   getContent();
    // }, 5000);
    // return () => clearInterval(interval);
    getContent();
  }, []);
  return {};
};

export default useContent;
