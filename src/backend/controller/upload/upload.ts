import UploadService from '@backend/services/db/upload/upload_db';
import { NextApiResponse } from 'next';

const UploadController = {
  create: async (req) => {
      if (req) {
          const {
              key,
              Bucket,
              ContentType
          } = req.body;
          const uploadConfig = await UploadService.create(req.body);
          return uploadConfig;
      } else {
          return ("Error in the controller")
      }
  }
};

export default UploadController;
