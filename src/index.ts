import { Options, CustomFileResult, FileType } from './index.d';
import { GCPCustomStorageEngine } from './GCP/GCPCustomStorage';
import { Request } from 'express';
import multer from 'multer';

enum StorageType {
  GCP = 'GCP',
}
export const storageEngine = (opts: Options) => {
  if (opts.storage === StorageType.GCP) {
    return new GCPCustomStorageEngine();
  }
};

export const MulterStorageEngine = (opts: Options) => {
  return multer({
    storage: storageEngine(opts),
  });
};

export { CustomFileResult, FileType, Request, StorageType };
