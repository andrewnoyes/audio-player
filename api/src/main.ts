import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';
import { PORT } from './config';

const corsOptions = {
  origin: (origin, cb) => {
    cb(null, true); // allowing all origins for dev
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.useStaticAssets(join(__dirname, '..', 'songs-uploads'), { prefix: '/media/' });

  await app.listen(PORT);
}
bootstrap();
