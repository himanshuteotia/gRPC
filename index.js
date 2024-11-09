const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});

const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:4000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: "This is a new todo",
  },
  (err, response) => {
    if (!err) {
      console.log("Received from server: " + JSON.stringify(response));
    } else {
      console.error(err);
    }
  }
);

const server = new grpc.Server();

server.bindAsync(
  "0.0.0.0:4000",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at XXXXXXXXXXXXXXXXXXXXX");
    server.start();
  }
);
