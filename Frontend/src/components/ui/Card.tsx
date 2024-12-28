import ArticleIcon from "../icons/ArticleIcon";
import DeleteIcon from "../icons/DeleteIcon";
import ShareIcon from "../icons/ShareIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
interface CardProps {
  contentType: "youtube" | "twitter" | "article";
  title: string;
  content: string;
  tags: string[];
  date: string;
}
// const contentTypes = [
//   "image",
//   "video",
//   "article",
//   "audio",
//   "tweet",
//   "youtube",
//   "link",
// ];
const Card = (props: CardProps) => {
  return (
    <div className="w-[316px] h-full bg-white rounded-lg shadow-md border border-slate-100 p-4">
      <div className="flex gap justify-between items-center">
        <div className="flex gap-2 items-center">
          {props.contentType === "article" && <ArticleIcon size="sm" />}
          {props.contentType === "twitter" && <TwitterIcon size="sm" />}
          {props.contentType === "youtube" && <YoutubeIcon size="sm" />}
          <h1 className="font-semibold">{props.title}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <a href=""></a>
          <ShareIcon size="sm" />
          <DeleteIcon size="sm" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {props.contentType === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={props.content.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
        {props.contentType === "youtube" && (
          <iframe
            className="w-full rounded-md"
            src={props.content.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {props.contentType === "article" && (
          <h1 className="text-sm text-gray-600 overflow-hidden">
            {props.content}
          </h1>
        )}
        <div className="flex gap-2 overflow-hidden ">
          {props.tags.map((tag,index) => (
            <div key={index} className="bg-mypurple-300 rounded-full px-3 py-1 text-xs text-mypurple-600 ">
              #{tag}
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400">Added on {props.date}</div>
      </div>
    </div>
  );
};

export default Card;
