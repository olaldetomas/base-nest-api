import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserFromGoogleDto {
  @IsNotEmpty({ message: 'Email required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}
