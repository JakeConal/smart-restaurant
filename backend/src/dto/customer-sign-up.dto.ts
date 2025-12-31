import { IsString, IsEmail, MinLength } from 'class-validator';

export class CustomerSignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
