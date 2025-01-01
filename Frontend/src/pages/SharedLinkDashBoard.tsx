import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContent } from "../types/myTypes";
import SideBar from "../components/ui/SideBar";
import Button from "../components/ui/Button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterSelector, filterTypeAtom } from "../store/filterSelector";
import Card from "../components/ui/Card";
import { contentAtom } from "../store/contentState";
import loadingIcon from "../assets/loading.png"
const SharedLinkDashBoard = () => {
    const [userName, setUserName] = useState<string>("");
  const setContent = useSetRecoilState(contentAtom);
  const { id } = useParams();
  const [filterType, setFilterType] = useRecoilState(filterTypeAtom);
  const filteredContents = useRecoilValue(filterSelector);
  const handleResetFilter = () => {
    setFilterType(null);
  };
  const getSharedContent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/link/getLink/${id}`
      );
      setContent(response?.data?.contents);
      setUserName(response?.data?.user?.userName);
      console.log(response?.data?.contents);
    } catch (error) {
      console.log("couldnt fetch the contents", error);
    }
  };
  useEffect(() => {
    getSharedContent();
  }, []);
  if (!filteredContents?.length) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <img className="animate-spin" src={loadingIcon} alt="loading" />
      </div>
    );
  }
  return (
    <>
      <SideBar />
      <div className="p-10 min-h-screen md:ml-72 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className=" md:text-3xl flex gap-4">
            All Notes of {userName}
            {filterType?.length && (
              <Button
                variant="primary"
                size="sm"
                className="hover:!bg-mypurple-600 hover:!text-white"
                text={filterType}
                onClick={handleResetFilter}
              />
            )}
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-normal">
          {filteredContents &&
            filteredContents.map((content: MyContent) => (
              <Card
                key={content?._id}
                id={content?._id}
                typeOfContent={content?.typeOfContent}
                title={content?.title}
                tags={content?.tags}
                createdAt={content?.createdAt}
                link={content?.link}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SharedLinkDashBoard;
