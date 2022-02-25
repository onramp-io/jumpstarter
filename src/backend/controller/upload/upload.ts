import type { NextApiRequest, NextApiResponse } from 'next';
import UploadService from '@backend/services/db/upload/upload_db';
import { UploadPostApiRequest } from '@backend/common/FileUploadApiInterfaces';

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
