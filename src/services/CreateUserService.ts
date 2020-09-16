import { getRepository } from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new Error('Email address already used.');
    }
    const hashPassword = await hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
