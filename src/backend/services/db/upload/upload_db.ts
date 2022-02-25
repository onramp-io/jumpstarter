import AWS from 'aws-sdk';
import { NextApiResponse } from 'next';
import { UploadPostParamsInterface } from '@backend/common/FileUploadApiInterfaces';
import { v1 as uuid } from 'uuid';
 
const s3 = new AWS.S3();

const UploadService = {
    create: async(createParams) => {
        try {
            console.log("params are: " + createParams)
            console.log("Param type is: " + typeof(createParams))
            console.log("bucket param is: " + createParams["Bucket"])
            s3.getSignedUrl('putObject', {
                Bucket: 'blend-jumpstarter-bucket',
                ContentType: 'jpeg',
                Key: 'test/test/.jpeg'
              }, (err, url) => {console.log(url)})
        } catch (err) {
              return err;
        }
    }
}

 export default UploadService;
