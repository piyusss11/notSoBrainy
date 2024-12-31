import axios from "axios";
import { useRecoilState } from "recoil";
import { sharedLinkAtom } from "../store/sharedLinkAtom";

const useShareLink = () => {
  const [sharedLink, setSharedLink] = useRecoilState(sharedLinkAtom);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sharedLink);
      alert("Link copied to clipboard");
    } catch (error) {
      alert("couldnt copy link");
      console.log(error);
    }
  };
  const handleCreateLink = async () => {
    try {
      const shareLink = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/link/shareLink`,
        {
          shareOn: true,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const shareableLink = shareLink.data?.yourShareableLink;
      setSharedLink(shareableLink);
      console.log(sharedLink);
    } catch (error) {
      console.log("error creating a link", error);
    }
  };
  const handleDeleteLink = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/link/shareLink`,
        {
          shareOn: false,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("deleted");
      setSharedLink("");
    } catch (error) {
      console.log("error deleting a link", error);
    }
  };

  return { handleCreateLink, handleDeleteLink, handleCopy };
};

export default useShareLink;
