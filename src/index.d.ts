import { CreateWriteStreamOptions } from '@google-cloud/storage';
import { Request } from 'express';

export type FileType = Express.Multer.File & {
  name: string;
};

export type nameFnType = (req: Request, file: FileType) => string;
export type validatorFn = (req: Request) => string | null;

export type Options = {
  bucket: string;
  options?: CreateWriteStreamOptions;
  nameFn?: nameFnType;
  validator?: validatorFn;
  projectId: string;
  keyFilename: string;
};

export interface CustomFileResult extends Partial<FileType> {
  name: string;
  bucket: string;
  selfLink: string;
}
