import ArticleIcon from "../icons/ArticleIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import TwitterIcon from "../icons/TwitterIcon";
import LogoutIcon from "../icons/LogoutIcon";
import LinkIcon from "../icons/LinkIcon";
import { useSetRecoilState } from "recoil";
import { filterTypeAtom } from "../../store/filterSelector";

const SideBarItems = () => {
  const setFilterType = useSetRecoilState(filterTypeAtom);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handleFilter = (str: string) => {
    console.log(str)
    
    setFilterType(str);
  };
  return (
    <div className="flex md:flex-col flex-wrap mt-4 gap-8 p-4 justify-center border-t-2 md:border-none border-mypurple-600">
      <div
        onClick={() => handleFilter("article")}
        className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 "
      >
        <ArticleIcon size="md" />
        Article
      </div>
      <div
        onClick={() => handleFilter("youtube")}
        className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 "
      >
        <YoutubeIcon size="md" />
        Videos
      </div>
      <div
        onClick={() => handleFilter("tweet")}
        className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 "
      >
        <TwitterIcon size="md" />
        Tweets
      </div>
      <div
        onClick={() => handleFilter("link")}
        className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 "
      >
        <LinkIcon size="md" />
        Links
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 "
      >
        <LogoutIcon size="md" />
        <h1 className="text-red-600">Logout</h1>
      </div>
    </div>
  );
};

export default SideBarItems;
