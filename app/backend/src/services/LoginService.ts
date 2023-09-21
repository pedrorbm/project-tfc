import { compareSync } from 'bcryptjs';
import jwt from '../utils/jwt';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUserModel from '../Interfaces/users/IUserModel';
import UserModel from '../database/models/users/UserModel';
import { Access } from '../types/Acess';
import { Token, Message } from '../types/Token';
import { Role } from '../types/Role';

function extractToken(bearerToken: string) {
  return bearerToken.split(' ')[1];
}

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async findUser(object: Access): Promise<ServiceResponse<Token | Message>> {
    const { password } = object;
    const user = await this.userModel.findByEmail(object);

    if (!user || !compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id, username } = user;

    const token = jwt.jwtSign({ id, username });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findRole(token: string): Promise<ServiceResponse<Role | Message>> {
    const { id } = jwt.jwtVerify(extractToken(token));
    const user = await this.userModel.findById(id);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not exist' } };
    }

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
