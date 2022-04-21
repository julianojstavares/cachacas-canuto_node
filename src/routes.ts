import { Router } from "express";
import { PopulateClientsController } from "./modules/Clientes/useCases/populate/populateClientsController";

const routes = Router();

const populateClientsController = new PopulateClientsController();
routes.post("/clients", populateClientsController.handle);

export { routes };