import { MulterStorageEngine, StorageType } from './../src/index';

const upload = MulterStorageEngine({
  storage: StorageType.GCP,
});

upload.single('example');
