const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new aws.S3 ({
    region,
    accessKeyId,
    secretAccessKey
})

exports.uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        contentDisposition: 'attachment',
        key: function (req, file, cb, res) {
            
            var mimetype = file.mimetype
            n = mimetype.lastIndexOf('/')
            mimetype = mimetype.slice(n+1)

            const keyName = `${Date.now().toString()}` + "." + mimetype
            cb(null, keyName); 
          
      },
      contentType: function (req, file, cb) {
          cb(null, file.mimetype); 
    },
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname}); 
      },
       
      })
})