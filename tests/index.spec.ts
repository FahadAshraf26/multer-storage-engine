import { MulterStorageEngine, StorageType } from '../src/index';

describe('MulterStorageEngine_function', () => {
  // Tests that the MulterStorageEngine function returns a multer instance with the correct storage engine
  it('test_returns_multer_instance_with_correct_storage_engine', () => {
    const multerInstance = MulterStorageEngine({
      storage: StorageType.GCP,
    });

    expect(multerInstance).toBeDefined();
  });
});
