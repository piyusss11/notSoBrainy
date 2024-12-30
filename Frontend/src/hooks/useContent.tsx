import axios from "axios";
import { useEffect, useState } from "react";

const useContent = () => {
  const [contents, setContents] = useState([]);
  const getContent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/content/getMyContent`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response);
      setContents(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContent();
  }, []);
  return contents;
};

export default useContent;
