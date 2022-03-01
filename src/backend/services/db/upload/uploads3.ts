import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const UploadService = {
  create: async (randomKey) => {
    const url = s3.getSignedUrl('putObject', {
      Bucket: process.env.AWS_BUCKET_NAME,
      ContentType: 'image/jpeg',
      Key: randomKey,
    });

    return { url, randomKey };
  },
};

export default UploadService;
