import { Module } from '@nestjs/common';
import { SharpPipe } from './sharp.pipe';

@Module({
	exports: [SharpPipe],
})
export class SharpModule {}
