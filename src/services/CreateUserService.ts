import { getRepository } from 'typeorm';
import Users from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const checkUserExist = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new Error('Email address already used.');
    }
    const user = userRepository.create({
      name,
      email,
      password,
    });
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
