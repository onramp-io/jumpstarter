import AWS from 'aws-sdk';
import chalk from 'chalk';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const UploadService = {
    create: async(createParams, res) => {
        try {
            const key = createParams.key
            const url = s3.getSignedUrl('putObject', {
                 Bucket: createParams.Bucket,
                 ContentType: createParams.ContentType,
                 Key: createParams.key
               })

            return {url, key};
        } catch (error) {
            console.log(
                chalk.red.bold(error.name + '@services/upload/upload_db.ts on Line 21'),
                error.message
              );
            res.status(error.code).json({
                status: error.status,
                message: error.message,
            });
        }
    }
}

 export default UploadService;
