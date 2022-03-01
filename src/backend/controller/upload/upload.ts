import UploadService from '@backend/services/db/upload/upload_db';
import { NotFoundError } from 'helpers/ErrorHandling/errors';
import { Request } from '@backend/middleware/verify_request';

const UploadController = {
  create: async (req: Request) => {
    const {
      user: { uid },
    } = req;
    const key = `${uid}/${Date.now()}.jpeg`;
    const uploadConfig = await UploadService.create(key);
    if (!uploadConfig)
      throw new NotFoundError('Upload configuration not provided.');
    return uploadConfig;
  },
};

export default UploadController;
