import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/technologies', (req, res) => {
  res.json([
    { id: '1', name: 'Playwright', category: 'E2E Testing' },
    { id: '2', name: 'Pact', category: 'Contract Testing' }
  ]);
});

const port = 3001;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
  });
}

export { app };