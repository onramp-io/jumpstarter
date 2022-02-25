import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const UploadService = {
    create: async(createParams) => {
        try {
             const url = s3.getSignedUrl('putObject', {
                 Bucket: createParams.Bucket,
                 ContentType: createParams.ContentType,
                 Key: createParams.key
               })

               return url;
        } catch (err) {
              return err;
        }
    }
}

 export default UploadService;
