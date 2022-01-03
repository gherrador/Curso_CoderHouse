const  { server }  = require("./server");
const { PORT } = require("../config/index");
const { getConnection } = require("../config/connection");
const { logger, loggererror, loggerwarn } = require('../src/Services/logger')

const port = PORT || 9000

getConnection()
.then((message) => {
    logger.info(message);
    server.listen(port, () => logger.info(`Servidor corriendo en el puerto ${port}`));
    server.on("error", (error) => loggererror.error(error));
  })
  .catch((error) => console.log(error));

process.on('exit', function(code) {
    logger.info('Exit code:' + code);
});