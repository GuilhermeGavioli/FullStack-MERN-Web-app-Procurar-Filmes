
import { User } from '../DTOS/user.dto';
import { UserRepository } from '../Repository/user.repository';

export interface UserService{
  createUserIfNecessary(user: User): Promise<void> 
}

export class UserServiceImpl {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUserIfNecessary(user: User): Promise<void> {
    console.log('user')
    console.log(user)
    const found_user = await this.userRepository.findOneByEmail(user.email)
    if (!found_user){
      // return id
      await this.userRepository.insertUser(user)
      console.log('inserted')
    }
  }
}