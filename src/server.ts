import app from './app';
import { connectRedis } from './utils/redis';
const PORT = process.env.PORT || 5000;


// Connect to Redis
connectRedis()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch(err => {
    console.error('Failed to connect to Redis', err);
  })


// test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the ExpressJS Backend with TypeScript" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
