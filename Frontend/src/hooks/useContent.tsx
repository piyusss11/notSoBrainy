import axios from "axios";
import { useEffect, useState } from "react";
import { MyContent } from "../types/myTypes";

const useContent = () => {
  const [contents, setContents] = useState<MyContent[]>();
  const getContent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/content/getMyContent`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setContents(response?.data?.getMycontents);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // const interval = setInterval(() => {
    //   getContent();
    // }, 5000);
    // return () => clearInterval(interval);
    getContent()
  }, []);
  return contents;
};

export default useContent;
