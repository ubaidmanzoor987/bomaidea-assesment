require("dotenv").config();
import express from "express";
import config from "config";
import validateEnv from "./utils/validateEnv";
import Routes from './interfaces/route.interface';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  constructor(routes: Routes[]) {
    validateEnv();
    this.app = express();
    this.port = config.get<number>("port");
    this.env = config.get<string>("nodeEnv");

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }
}

export default App;
