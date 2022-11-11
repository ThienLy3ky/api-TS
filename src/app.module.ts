import { CommonResInterceptor } from './interceptors/common_response.inteceptor';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { UsersModule } from './users/users.model';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CleanTimeModule } from './routers/cleantimes/cleantime.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CleanTimeModule, AuthModule, UsersModule, PassportModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CommonResInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    JwtStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
