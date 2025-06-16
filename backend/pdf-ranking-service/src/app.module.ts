import { Module } from '@nestjs/common';
import { CvModule } from './cv/cv.module';

@Module({
  imports: [CvModule],
})
export class AppModule {}
