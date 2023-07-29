import { MulterStorageEngine } from './../src/index';
const bucket = 'your bucket name';
const projectId = 'your projectId';
const keyFilename = 'your json file path';

const upload = MulterStorageEngine({
  bucket,
  projectId,
  keyFilename,
});

upload.single("example");
