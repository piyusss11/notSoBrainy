import { Request, Response, Router } from "express";
import { UserAuth } from "../middlewares/auth";
import Content from "../models/content";

const contentRouter = Router();
contentRouter.post("/create", UserAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { title, typeOfContent, link, tags } = req.body;
    const createContent = await Content.create({
      userId,
      title,
      typeOfContent,
      link,
      tags,
    });
    res
      .status(201)
      .json({ message: "Content created successfully", createContent });
  } catch (error) {
    res.status(500).json({ message: "Error creating content", error: error });
  }
});
contentRouter.get(
  "/getMyContent",
  UserAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const getMycontents = await Content.find({ userId }).populate(
        "userId",
        "userName"
      );
      if (!getMycontents) {
        res.status(404).json({ message: "No content found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Content succesfully fetched", getMycontents });
    } catch (error) {
      res.status(500).json({ message: "Error fetching content", error: error });
    }
  }
);
contentRouter.delete(
  "/delete/:id",
  UserAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;
      const contentId = req.params.id;
      const deleteContent = await Content.deleteOne({
        _id: contentId,
        userId: userId,
      });
      if (!deleteContent) {
        res
          .status(404)
          .json({ message: "content is not yours or content is not present" });
        return;
      }
      res.status(200).json({ message: "Content Deleted succesfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "facing error while deleting , try again" });
    }
  }
);
export default contentRouter;
