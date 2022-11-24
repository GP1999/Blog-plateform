
import {
  emailRegex,
  passwordRegex,
  nameRegex,
  phoneNumberRegex,
} from '../../constants';
import ServiceError from '../../util/serviceError';
import { signUpRequest } from './user.interface';

export function signUpDataValidate(data: signUpRequest):void {
  if (!emailRegex.test(data.username))
    throw new ServiceError('BR-1', 400, 'Invalid Email Address');
  if (
    data.password.length < 8 ||
    data.password.length > 20 ||
    !passwordRegex.test(data.password)
  )
    throw new ServiceError(
      'BR-1',
      400,
      'Password should have minimum 8 and max 20 char with at least at least one letter, one number and one special character',
    );

  if (!nameRegex.test(data.name))
    throw new ServiceError('BR-1', 400, 'Invalid name');

  if (!phoneNumberRegex.test(data.phoneNumber))
    throw new ServiceError('BR-1', 400, 'Invalid phoneNumber');
}
