import UserSequelize from './UserSequelize';
import IUserModel from '../../../Interfaces/users/IUserModel';
import IUser from '../../../Interfaces/users/IUser';
import { Access } from '../../../types/Acess';

export default class UserModel implements IUserModel {
  private model = UserSequelize;

  async findByEmailPassword(object: Access): Promise<IUser | null> {
    const { email } = object;
    const user = this.model.findOne({ where: { email } });
    if (!user) return null;

    return user;
  }
}
