// Inicializa o servidor
// O arquivo server.js é responsável por iniciar o servidor express.
import app from './app.js';
import 'dotenv/config'

// Inicializa o servidor na porta 3000
app.listen(process.env.APP_PORT);