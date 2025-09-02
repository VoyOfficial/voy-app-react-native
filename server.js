const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// GET /search/:query -> sempre retorna o array completo
server.get('/search/:query', (req, res) => {
  const db = router.db;
  const search = db.get('search').value();
  res.json(search);
});

// POST /search/:query -> adiciona e retorna o array completo
server.post('/search/:query', (req, res) => {
  const db = router.db;
  const newItem = req.body;

  db.get('search').push(newItem).write();

  const search = db.get('search').value();
  res.json(search);
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running 🚀');
});
