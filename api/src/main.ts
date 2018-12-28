import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { PORT } from './config';

const corsOptions = {
  origin: (origin, cb) => {
    cb(null, true); // allowing all origins for dev
  },
};

const UPLOAD_DIR = join(__dirname, '..', 'songs-uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.useStaticAssets(UPLOAD_DIR, { prefix: '/media/' });

  await app.listen(PORT);
}
bootstrap();
