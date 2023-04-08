import { Module } from '@nestjs/common';
import { UsersModule } from './@core/infra/frameworks/nestjs/modules/users/users.module';
import { AuthModule } from './@core/infra/frameworks/nestjs/modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import env from 'env';
@Module({
	imports: [
		UsersModule,
		AuthModule,
		MongooseModule.forRoot(env.MONGO_CONNECTION_URL),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
