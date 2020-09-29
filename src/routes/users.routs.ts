import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAthenticated from '../middiewares/ensureAthenticated';
import uploadconfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadconfig);

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

usersRouter.patch(
  '/avatar',
  ensureAthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });
      return response.json({ ok: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;
