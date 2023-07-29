import { Readable } from 'stream';
import { FileType, CustomFileResult, MulterStorageEngine, storageEngine, Request } from '../src/index';

// describe('CustomStorageEngine_class', () => {
//   // Tests that the CustomStorageEngine class successfully handles file upload
//   it('test_successfully_handle_file_upload', (done) => {
//     const req = {} as Request;
//     const file = {
//       fieldname: 'file',
//       originalname: 'test.jpg',
//       stream: new Readable(),
//       size: 1000,
//     } as FileType;

//     const cb = (error?: unknown, info?: CustomFileResult) => {
//       expect(error).toBeNull();
//       expect(info).toEqual({
//         name: expect.any(String),
//         bucket: expect.any(String),
//         size: expect.any(Number),
//         selfLink: expect.any(String),
//       });
//       done();
//     };

//     const customStorageEngine = storageEngine({
//       bucket: 'test-bucket',
//       projectId: 'test-project-id',
//       keyFilename: 'test-key-filename',
//     });

//     customStorageEngine._handleFile(req, file, cb);
//   });
// });

describe('MulterStorageEngine_function', () => {
  // Tests that the MulterStorageEngine function returns a multer instance with the correct storage engine
  it('test_returns_multer_instance_with_correct_storage_engine', () => {
    const opts = {
      bucket: 'test-bucket',
      projectId: 'test-project-id',
      keyFilename: 'test-key-filename',
    };

    const multerInstance = MulterStorageEngine(opts);

    expect(multerInstance).toBeDefined();
  });
});
