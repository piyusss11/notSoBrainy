import axios from "axios";
import ArticleIcon from "../icons/ArticleIcon";
import DeleteIcon from "../icons/DeleteIcon";
import LinkIcon from "../icons/LinkIcon";
import ShareIcon from "../icons/ShareIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
interface CardProps {
  key?: string;
  title: string;
  typeOfContent: "youtube" | "tweet" | "article" | "link";
  tags: string[];
  createdAt: string;
  link: string;
}
// const contentTypes = ["article", "youtube", "tweet", "link"];
const Card = (props: CardProps) => {
  const handleDelete = async () => {
    console.log(props.key);

    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/content/delete/${props.key}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("content deleted");
      
    } catch (error) {
      console.log(error);
    }
  };
  const formattedDate = new Date(props.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className="w-[316px] h-full bg-white rounded-lg shadow-md border border-slate-100 p-4">
      <div className="flex gap justify-between items-center">
        <div className="flex gap-2 items-center">
          {props.typeOfContent === "article" && <ArticleIcon size="sm" />}
          {props.typeOfContent === "tweet" && <TwitterIcon size="sm" />}
          {props.typeOfContent === "youtube" && <YoutubeIcon size="sm" />}
          {props.typeOfContent === "link" && <LinkIcon size="sm" />}
          <h1 className="font-semibold">{props.title}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <a href={props.link} target="_blank">
            {" "}
            <ShareIcon size="sm" />
          </a>
          <div onClick={handleDelete}>
            <DeleteIcon size="sm" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {props.typeOfContent === "tweet" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
        {props.typeOfContent === "youtube" && (
          <iframe
            className="w-full rounded-md"
            src={props.link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {props.typeOfContent === "article" && (
          <h1 className="text-sm text-gray-600 overflow-hidden">
            {props.link}
          </h1>
        )}
        {props.typeOfContent === "link" && (
          <h1 className="text-sm text-gray-600 overflow-hidden">
            {props.link}
          </h1>
        )}
        <div className="flex gap-2 overflow-hidden ">
          {props.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-mypurple-300 rounded-full px-3 py-1 text-xs text-mypurple-600 "
            >
              #{tag}
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400">Added on {formattedDate}</div>
      </div>
    </div>
  );
};

export default Card;
