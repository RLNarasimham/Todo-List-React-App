import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const SECRET_KEY = 'your_secret_key';

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username, password }).value();
  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});