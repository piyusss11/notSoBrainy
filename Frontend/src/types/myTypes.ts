export type ZodErrorResponse = {
  message: {
    path: string[];
    message: string;
  }[];
};

export type LoginErrorResponse = {
  message: string;
};
