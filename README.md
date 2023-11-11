# multer-cloud-storage-engine

multer-cloud-storage-engine is a [multer](https://github.com/expressjs/multer) custom store engine for Google Cloud Storage service.

## Installation

    npm i multer-cloud-storage-engine --save

or

    yarn add multer-cloud-storage-engine

## SET_ENVIRONMENT_VARIABLES

### GCP

GCP_PROJECT_ID =YOUR_GCP_PROJECT_ID

GCP_KEY_FILE_NAME =YOUR_JSON_KEY_FILE_PATH

GCP_BUCKET_NAME =YOUR_GCP_BUCKET_NAME

## Usage

### ES6

    import { MulterStorageEngine, StorageType } from 'multer-cloud-storage-engine';
    import express from 'express';

    const app = express();

    const upload = MulterStorageEngine({
        storage: StorageType.GCP,
    });

    app.post('/upload', upload.single('profileImage'), (req, res) => {
        console.log(req.files);
        res.json(req.files);
    });
