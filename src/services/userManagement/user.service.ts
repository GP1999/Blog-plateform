import { NextFunction, Request, Response } from 'express';
import uuid from 'uuid4';

import { signUpDataValidate } from './user.helper';
import userCredsTable from '../../database/postgreSQL/models/userCredentials.model';
import userProfileTable from '../../database/postgreSQL/models/userProfile.model';
import postgresAdaptor from '../../database/postgreSQL/postgres.adaptor';
import { createJwt, getHash } from '../../util/helper';
import ServiceError from '../../util/serviceError';

export async function signUp(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const sequelize = postgresAdaptor.getConnection();
  const transaction = await sequelize.transaction();
  try {
    signUpDataValidate(request.body);

    const userCreds = userCredsTable.getTable();
    const userProfile = userProfileTable.getTable();
    const { username, password, name, phoneNumber } = request.body;
    const passwordHash = getHash(password);
    const userProfileData = {
      userId: uuid(),
      name,
      phoneNumber,
      email: username,
    };

    await userProfile.create(userProfileData, { transaction });
    const userCredsData = {
      username,
      password: passwordHash,
      userId: userProfileData.userId,
    };
    await userCreds.create(userCredsData, { transaction });
    const accessToken = createJwt(
      { userId: userProfileData.userId },
      '10 days',
    );
    transaction.commit();
    response.status(200).send({ accessToken, userId: userProfileData.userId });
    return;
  } catch (error: any) {
    transaction.rollback();
    next(error);
  }
}

export async function logIn(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { username, password } = request.body;
    console.log(password);
    const userInfo = await userCredsTable.getUserCreds(username);
    const passwordHash = getHash(password);
    if (passwordHash !== userInfo?.password)
      throw new ServiceError('UA-1', 401, 'Incorrect username or password');

    const accessToken = createJwt({ userId: userInfo.userId }, '10 days');

    response.status(200).send({ accessToken });
    return;
  } catch (error: any) {
    next(error);
  }
}
