import { MulterStorageEngine, StorageType } from './../src/index';
import express from 'express';

const app = express();

const upload = MulterStorageEngine({
  storage: StorageType.GCP,
});

app.post('/upload', upload.single('profileImage'), (req, res) => {
  console.log(req.files);
  res.json(req.files);
});
