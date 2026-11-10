import app from './app.ts';
import sequelize from './config/database.ts';

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Viewplus running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('DB cannot be connected. Error:', error);
});
