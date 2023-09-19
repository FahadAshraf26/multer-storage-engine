import { Bucket, CreateWriteStreamOptions, Storage } from '@google-cloud/storage';
import { nameFnType, validatorFn, CustomFileResult, FileType } from '../index.d';
import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const defaultNameFn: nameFnType = (_: Request, file: Express.Multer.File) => {
  const fileExt = path.extname(file.originalname);

  return `${file.fieldname}_${Date.now()}${fileExt}`;
};

class GCPCustomStorageEngine implements multer.StorageEngine {
  private bucket: Bucket;
  private options?: CreateWriteStreamOptions;
  private nameFn: nameFnType;
  private validator?: validatorFn;

  constructor() {
    const bucketName = String(process.env.GCP_BUCKET_NAME);
    this.bucket = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE_NAME,
    }).bucket(bucketName);
    this.nameFn = defaultNameFn;
  }

  _handleFile(request: Request, file: FileType, cb: (error?: unknown, info?: CustomFileResult) => void): void {
    if (!this.bucket) {
      cb(new Error('bucket is a required field.'));
      return;
    }

    if (this.validator) {
      // Validator is defined
      const validationError = this.validator(request);

      if (validationError) {
        // If validator function returned a string which means there was an error
        cb(new Error(validationError));
        return;
      }
    }

    const fileName = this.nameFn(request, file);

    const storageFile = this.bucket.file(fileName);
    const fileWriteStream = storageFile.createWriteStream(this.options);
    const fileReadStream = file.stream;

    fileReadStream
      .pipe(fileWriteStream)
      .on('error', (err) => {
        fileWriteStream.end();
        storageFile.delete({ ignoreNotFound: true });
        cb(err);
      })
      .on('finish', () => {
        cb(null, {
          name: fileName,
          bucket: storageFile.metadata.bucket,
          size: storageFile.metadata.size,
          selfLink: storageFile.metadata.selfLink,
        });
      });
  }

  _removeFile(_: Request, file: FileType, cb: (error: Error | null) => void): void {
    this.bucket.file(file.name).delete({ ignoreNotFound: true });
    cb(null);
  }
}

export { GCPCustomStorageEngine };
