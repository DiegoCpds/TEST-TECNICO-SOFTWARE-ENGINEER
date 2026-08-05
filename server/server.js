// Importar módulos
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';

// Crear una instancia de la aplicación express
const app = express();

// Configurar el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

mongoose.connect('mongodb://localhost:27017/local', {})
  .then(() => {
    console.log('Conexión a la base de datos establecida');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

