import IUser from './IUser';
import { Access } from '../../types/Acess';

export default interface IUserModel {
  findByEmail(object: Access): Promise<IUser | null>;
  findById(id: number): Promise<IUser | null>;
}
