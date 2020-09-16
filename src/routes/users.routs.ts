import { Router } from 'express';
import { getSalt } from 'bcryptjs';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;

    return response.status(200).json({ user });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
