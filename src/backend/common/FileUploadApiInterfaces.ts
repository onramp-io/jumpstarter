import { NextApiRequest } from "next";

export interface UploadPostParamsInterface {
    key: string;
    Bucket: string;
    ContentType: string;
  }

  export interface UploadPostApiRequest extends NextApiRequest {
    body: {
      uploadParams: UploadPostParamsInterface;
    };
  }