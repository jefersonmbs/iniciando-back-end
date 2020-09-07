import express from 'express';
import routs from './routes';

const app = express();
app.use(express.json());
app.use(routs);

app.listen(3333, () => {
  console.log('🚀 listening on port 3333');
});
