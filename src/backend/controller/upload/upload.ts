import UploadService from '@backend/services/db/upload/upload_db';
import { NotFoundError } from 'helpers/ErrorHandling/errors'
import chalk from 'chalk';

const UploadController = {
  create: async (req, res) => {
      try {
        if (req) {
            const {
                key,
                Bucket,
                ContentType
            } = req.body;
            const uploadConfig = await UploadService.create(req.body, res);
            return uploadConfig;
        } else {
            throw new NotFoundError('Upload configuration not provided.')
        }
      } catch (error) {
        console.log(
            chalk.red.bold(error.name + '@backend/controller/upload/upload.ts on Line 21'),
            error.message
          );
        res.status(error.code).json({
            status: error.status,
            message: error.message,
        });
      }
  }
};

export default UploadController;
