import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../schema/customer.schema';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
