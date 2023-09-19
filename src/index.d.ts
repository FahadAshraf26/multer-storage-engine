import { Request } from 'express';

export type FileType = Express.Multer.File & {
  name: string;
};
export type nameFnType = (req: Request, file: FileType) => string;
export type validatorFn = (req: Request) => string | null;
export type Options = {
  storage: string;
};

export enum StorageType {
  GCP = 'GPC',
}

export interface CustomFileResult extends Partial<FileType> {
  name: string;
  bucket: string;
  selfLink: string;
}
