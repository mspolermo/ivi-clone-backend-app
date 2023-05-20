import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from "./app.module";
import {HttpExceptionFilter} from "../../api-gateway/src/exceptions/httpExceptionFilter";


async function start() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.listen();
}

start();