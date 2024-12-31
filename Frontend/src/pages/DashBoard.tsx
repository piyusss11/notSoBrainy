import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import ShareIcon from "../components/icons/ShareIcon";
import AddIcon from "../components/icons/AddIcon";
import Card from "../components/ui/Card";
import ContentDialogBox from "../components/ui/ContentDialogBox";
import SideBar from "../components/ui/SideBar";
import useContent from "../hooks/useContent";
import { MyContent } from "../types/myTypes";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { contentAtom } from "../store/contentState";
import { filterSelector, filterTypeAtom } from "../store/filterSelector";
import useShareLink from "../hooks/useShareLink";
import { sharedLinkAtom } from "../store/sharedLinkAtom";
import CloseIcon from "../components/icons/CloseIcon";

const DashBoard = () => {
  const [contentBoxOpen, setContentBoxOpen] = useState(false);

  const myContents = useContent();
  const { handleCreateLink, handleDeleteLink,handleCopy } = useShareLink();

  const setContent = useSetRecoilState(contentAtom);
  const [filterType, setFilterType] = useRecoilState(filterTypeAtom);
  setContent(myContents);
  const filteredContents = useRecoilValue(filterSelector);
  const sharedLink = useRecoilValue(sharedLinkAtom);

  const handleResetFilter = () => {
    setFilterType(null);
  };
  useEffect(() => {}, [sharedLink]);
  return (
    <>
      <SideBar />
      <div className="p-10 min-h-screen md:ml-72 bg-gray-100">
        <ContentDialogBox
          open={contentBoxOpen}
          onClose={() => setContentBoxOpen(false)}
        />
        <div className="flex justify-between items-center">
          <h1 className=" md:text-3xl flex gap-4">
            All Notes{" "}
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
          <div className="flex items-center gap-4">
            {sharedLink?.length > 0 ? (
              <div className="flex items-center gap-4">
                <button onClick={handleCopy} className="bg-green-300 px-1 py-2 text-sm md:px-3 md:py-2 md:text-xs text-white rounded-md ">
                  {sharedLink}
                </button>
                <Button
                className="bg-red-500 hover:bg-red-400 text-white "
                  variant="secondary"
                  size="sm"
                  text="Click to erase"
                  startIcon={<CloseIcon size="sm" />}
                  onClick={handleDeleteLink}
                />
              </div>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                text="Click to Share Brain"
                startIcon={<ShareIcon size="sm" />}
                onClick={handleCreateLink}
              />
            )}

            <Button
              variant="primary"
              size="sm"
              text="Add Content"
              startIcon={<AddIcon size="sm" />}
              onClick={() => {
                setContentBoxOpen(true);
              }}
            />
          </div>
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

export default DashBoard;
