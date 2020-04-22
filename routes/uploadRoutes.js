const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid');
const cors = require('cors');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

module.exports = app => {

  try {
    app.get('/api/upload', requireLogin, (req, res) => {
      const key = `${req.user.id}/${uuidv1()}.jpeg`;

      s3.getSignedUrl(
        'putObject',
        {
          Bucket: 'photoblog-bucket1',
          ContentType: 'image/jpeg',
          Key: key
        },
        (err, url) => res.send({ key, url })
      );
    });
  } catch (e) {
    console.log(e);
  }

};
