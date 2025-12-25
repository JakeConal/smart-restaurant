import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Table } from './schema/table.schema';
import { MenuCategoryService } from './menu-category/menu-category.service';
import { MenuCategoryController } from './menu-category/menu-category.controller';
import { MenuCategoryModule } from './menu-category/menu-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Table],
        synchronize: true,
      }),
    }),
    TableModule,
    MenuModule,
    MenuCategoryModule,
  ],
  controllers: [AppController, MenuCategoryController],
  providers: [AppService, MenuCategoryService],
})
export class AppModule {}
