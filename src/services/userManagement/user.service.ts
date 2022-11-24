import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import uuid from 'uuid4';
import { signUpDataValidate } from './user.helper';
import userCredsTable from '../../database/postgreSQL/models/userCredentials.model';
import userProfileTable from '../../database/postgreSQL/models/userProfile.model';
import postgresAdaptor from '../../database/postgreSQL/postgres.adaptor';

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
    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
      const userProfileData = {
        userId:  uuid(),
        name,
        phoneNumber,
        email: username,
      };

    await userProfile.create(userProfileData, { transaction });
    const userCredsData = {
      username,
      password: passwordHash,
      userId:userProfileData.userId,
    };
    await userCreds.create(userCredsData, { transaction });
    

    transaction.commit();
    response.status(200).send();
    return;
  } catch (error: any) {
    transaction.rollback();
    next(error);
  }
}
