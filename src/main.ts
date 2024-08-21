import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';


const htttpsOptions = {
  key:fs.readFileSync('./ssl/vrtraining.key'),
  cert:fs.readFileSync('./ssl/vrtraining.crt')
}

async function bootstrap() {

  // const app = await NestFactory.create(AppModule,{httpsOptions:htttpsOptions});
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  /*============= Implementing Swagger For API Documentation START ==================*/
  const config = new DocumentBuilder()
    .setTitle('Syngene Dashboard App Documentation')
    .setDescription('The Syengene API description')
    .setVersion('1.0.0')
    .addTag('Syengene')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('SyengeneApi', app, document);
  /*============= Implementing Swagger For API Documentation END ==================*/

  const h = await app.listen(process.env.APP_SERVER_PORT);

  Logger.log("Server Running at", process.env.APP_SERVER_PORT);

}
bootstrap();
