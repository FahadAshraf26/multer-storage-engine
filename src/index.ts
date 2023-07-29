import { nameFnType, validatorFn, Options, CustomFileResult, FileType } from './index.d';
import { Bucket, CreateWriteStreamOptions, Storage } from '@google-cloud/storage';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const defaultNameFn: nameFnType = (_req: Request, file: Express.Multer.File) => {
  const fileExt = path.extname(file.originalname);

  return `${file.fieldname}_${Date.now()}${fileExt}`;
};

class CustomStorageEngine implements multer.StorageEngine {
  private bucket: Bucket;
  private options?: CreateWriteStreamOptions;
  private nameFn: nameFnType;
  private validator?: validatorFn;

  constructor(opts: Options) {
    this.bucket = new Storage({
      projectId: opts.projectId,
      keyFilename: opts.keyFilename,
    }).bucket(opts.bucket);
    this.options = opts.options || undefined;
    this.nameFn = opts.nameFn || defaultNameFn;
    this.validator = opts.validator || undefined;
  }
  _handleFile(req: Request, file: FileType, cb: (error?: unknown, info?: CustomFileResult) => void): void {
    if (!this.bucket) {
      cb(new Error('bucket is a required field.'));
      return;
    }

    if (this.validator) {
      // Validator is defined
      const validationError = this.validator(req);

      if (validationError) {
        // If validator function returned a string which means there was an error
        cb(new Error(validationError));
        return;
      }
    }

    const fileName = this.nameFn(req, file);

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
  _removeFile(req: Request, file: FileType, cb: (error: Error | null) => void): void {
    this.bucket.file(file.name).delete({ ignoreNotFound: true });
    cb(null);
  }
}

export const storageEngine = (opts: Options) => {
  return new CustomStorageEngine(opts);
};

export const MulterStorageEngine = (opts: Options) => {
  return multer({
    storage: storageEngine(opts),
  });
};

export { CustomFileResult, FileType, Request };
