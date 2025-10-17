import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantSchema } from './typeorm/schema/tenant-schema';

@Module({
  imports: [TypeOrmModule.forFeature([TenantSchema])],
})
export class TenantModule {}
