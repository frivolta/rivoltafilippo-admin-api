import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleware } from './common/authentication.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ method: RequestMethod.ALL, path: '/' });
  }
}
