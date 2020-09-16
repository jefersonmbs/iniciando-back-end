import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();
    const { user } = await authenticateUser.excute({
      email,
      password,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;
    return response.status(200).json({ user });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
