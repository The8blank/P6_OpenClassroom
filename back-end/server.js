// importation du module HTTP
const http = require("http");
const app = require("./app");

// fonction qui s'assure que le port fourni est un nombre, le cas echéant, un string, sinon foux
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// const port normalizé 
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//crée le server HTTP et redirige les requête vers l'app
const server = http.createServer(app);

// renvoie les erreurs du server
server.on("error", errorHandler);

// check si le server est bien en train d'écouter sur le port
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// ecoute sur le port
server.listen(port);
