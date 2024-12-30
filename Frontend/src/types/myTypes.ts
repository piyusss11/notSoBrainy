export type ZodErrorResponse = {
  message: {
    path: string[];
    message: string;
  }[];
};

export type LoginErrorResponse = {
  message: string;
};

export interface MyContent {
  _id: string;
  title: string;
  typeOfContent: "youtube" | "tweet" | "article" | "link";
  tags: string[];
  createdAt: string;
  link: string;
}