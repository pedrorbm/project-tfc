import { compareSync } from 'bcryptjs';
import jwt from '../utils/jwt';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUserModel from '../Interfaces/users/IUserModel';
import UserModel from '../database/models/users/UserModel';
import { Access } from '../types/Acess';
import { Token, Message } from '../types/Token';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async findUser(object: Access): Promise<ServiceResponse<Token | Message>> {
    const { password } = object;
    const user = await this.userModel.findByEmailPassword(object);

    if (!user || !compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id, username } = user;

    const token = jwt.jwtSign({ id, username });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
