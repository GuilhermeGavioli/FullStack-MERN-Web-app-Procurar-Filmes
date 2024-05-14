
import { ObjectId } from 'mongodb';
import { User } from '../DTOS/user.dto';
import { UserRepository } from '../Repository/user.repository';

export interface UserService{
  createUserIfNecessary(user: User): Promise<string | undefined>
}

export class UserServiceImpl {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUserIfNecessary(user: User): Promise<string | undefined>{
    const found_user = await this.userRepository.findOneByEmail(user.email)
    if (found_user){
      return found_user._id.toString()
    } else {
      const inserted_user_id = await this.userRepository.insertUser(user)
      if (inserted_user_id) return inserted_user_id.toString()
      return undefined
    }
  }
}