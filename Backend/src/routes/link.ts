import { Request, Response, Router } from "express";
import { UserAuth } from "../middlewares/auth";
import randomHash from "../utils/linkHash";
import Link from "../models/Link";
import Content from "../models/content";
import { User } from "../models/User";

const linkRouter = Router();

linkRouter.post("/shareLink", UserAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { shareOn } = req.body;
    if (!shareOn) {
      res
        .status(400)
        .json({ message: "sharing i not switched on by the user" });
      return;
    }
    const linkHash = randomHash(10);
    console.log(linkHash);

    if (!linkHash) {
      res.status(500).json({ message: "Error creating link string" });
      return;
    }
    const createdLink = await Link.create({
      hash: linkHash,
      userId,
    });
    if (!createdLink) {
      res.status(500).json({ message: "Error creating link model" });
      return;
    }
    res.status(201).json({ message: "Link created successfully", createdLink });
  } catch (error) {
    res.status(500).json({ message: "Error creating link", error: error });
  }
});
linkRouter.get(
  "/getLink/:link",
  UserAuth,
  async (req: Request, res: Response) => {
    try {
      const linkHash = req.params.link;
      const getLink = await Link.findOne({ hash: linkHash });
      if (!getLink) {
        res.status(404).json({ message: "Link not found" });
        return;
      }
      const getUserInfo = await User.findById(getLink.userId);
      if (!getUserInfo) {
        res.status(404).json({ message: "User not found of requested user" });
        return;
      }
      const getContents = await Content.find({ userId: getLink.userId });
      if (!getContents) {
        res
          .status(404)
          .json({ message: "Contents not found of requested user" });
        return;
      }
      res
        .status(200)
        .json({
          message: "contents found successfully",
          user: getUserInfo,
          contents: getContents,
        });
    } catch (error) {
      res.status(500).json({ message: "Error getting contents", error: error });
    }
  }
);
export default linkRouter;
