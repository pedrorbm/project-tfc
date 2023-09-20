import IUser from './IUser';
import { Access } from '../../types/Acess';

export default interface IUserModel {
  findByEmailPassword(object: Access): Promise<IUser | null>;
}
