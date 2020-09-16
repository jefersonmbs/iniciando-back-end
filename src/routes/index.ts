import { Router } from 'express';
import appointmentsRouter from './appointments.routs';
import usersRouter from './users.routs';
import sessionRouter from './saessions.routs';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
