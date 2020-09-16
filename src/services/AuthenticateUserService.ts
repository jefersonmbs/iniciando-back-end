import { getRepository } from 'typeorm';
import { compare, getSalt } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}
class AuthenticateUserService {
  public async excute({ email, password }: Request): Promise<{ user: User }> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    return { user };
  }
}
export default AuthenticateUserService;
