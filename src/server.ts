import app from './app';

const PORT = process.env.PORT || 5000;

// test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the ExpressJS Backend with TypeScript" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
