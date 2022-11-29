import { NextFunction, Response } from 'express';
import userPermissions from '../../database/postgreSQL/models/userPermissions.model';
import ServiceError from '../../util/serviceError';
import { AuthenticatedRequest } from '../../util/shared.interface';

export async function isAuthorized(
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const resourceId = request.params.resourceId;
    const userId = request?.context?.userId;
    let isAuthorised = false;
    if (request.method === 'GET')
      isAuthorised = await checkAuthorisation(userId, resourceId, 'READ');
    else isAuthorised = await checkAuthorisation(userId, resourceId, 'WRITE');
    if (isAuthorised) {
      next();
    } else {
      next(new ServiceError('UNA-2', 401, 'Not Authorised to Perform action'));
    }
  } catch (error) {
    next(error);
  }
}

async function checkAuthorisation(
  userId: string,
  resourceId: string,
  requirePermission: string,
): Promise<boolean> {
  const result = await userPermissions.getUserPermission(userId, resourceId);
  if (result?.permission === 'WRITE') return true;
  if (result?.permission === 'READ' && requirePermission === 'WRITE')
    return false;
  if (!result?.permission && requirePermission === 'READ') return true;
  return false;
}
