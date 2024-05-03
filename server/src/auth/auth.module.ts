import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserModel } from 'src/schemas/user.schema';
import { UserController } from 'src/user/user.controller';

/**
 * Module for auth functionality.
 */
@Module({
  controllers: [AuthController, UserController],
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '10d' },
    }),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  providers: [AuthService, UserService],
})
export class AuthModule {}
