
import { ObjectId } from 'mongodb';
import { MongoUser, User } from '../DTOS/user.dto';
import { UserRepository } from '../Repository/user.repository';

export interface UserService{
  createUserIfNecessary(user: User): Promise<string | undefined>
  getUser(id: string): Promise<MongoUser | undefined>
  editUser(id: string, name: string): Promise<Boolean>
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

  async getUser(id: string): Promise<MongoUser | undefined>{
    const found_user = await this.userRepository.findUserById(id)
    return found_user as MongoUser | undefined
  }

  async editUser(id: string, name: string): Promise<Boolean>{
    const was_name_updated = await this.userRepository.editUserNameById(id, name)
    if (was_name_updated) return true
    return false
  }
}