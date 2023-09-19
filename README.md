# multer-cloud-storage-engine
multer-cloud-storage-engine is a [multer](https://github.com/expressjs/multer) custom store engine for Google Cloud Storage service.

## Installation

    npm i multer-cloud-storage-engine --save

or

    yarn add multer-cloud-storage-engine

## Usage
### ES6
    import { MulterStorageEngine } from 'multer-cloud-storage-engine';

    const app = express();

    const uploadHandler = MulterStorageEngine({
      bucket: "your bucket name",
      projectId: "your gcp projectId" ,
      keyFilename: "your json key file path",
    });

    app.post('/upload', uploadHandler.any(), (req, res) => {
        console.log(req.files);
        res.json(req.files);
    });