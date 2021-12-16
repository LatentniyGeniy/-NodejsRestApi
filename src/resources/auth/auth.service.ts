import jwt, { Secret } from 'jsonwebtoken';
import AdminService  from '../admin/admin.service';
import config from '../../common/config';

const { JWT_SECRET_KEY } = config;

const gettingToken = async (userLogin: string, userPassword: string): Promise<string | null> => {
  const user = await AdminService.findByCredentials(userLogin, userPassword);
  if (!user) {
    return null;
  }
  const { id, login } = user;
  const token = jwt.sign({ id, login }, <Secret>JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
};

export default { gettingToken }