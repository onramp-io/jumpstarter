import type { NextApiRequest, NextApiResponse } from "next";
import UploadController from "@backend/controller/upload/upload";
import RequestMethod from "@backend/common/RequestMethod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      switch (req.method) {
          case RequestMethod.POST: 
            try {
                console.log(`you're at the /pages/api/upload/index NextApiHandler's POST method!`)
                const uploadConfig = await UploadController.create(req);
                res.status(200).send(uploadConfig)
            } catch (err){
                console.log(err);
            }
      }
  }

