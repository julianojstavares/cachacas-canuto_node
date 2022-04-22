import { ensureTableNotEmpty } from './middlewares/ensureTableNotEmpty';
import { ensureTableEmpty } from './middlewares/ensureTableEmpty';
import { Router } from "express";
import { ClearClientsController } from "./modules/Clientes/useCases/clear/clearClientsController";
import { PopulateClientsController } from "./modules/Clientes/useCases/populate/populateClientsController";

const routes = Router();

// Clientes
const populateClientsController = new PopulateClientsController();
routes.post("/clients", ensureTableEmpty('clients'), populateClientsController.handle);

const clearClientsController = new ClearClientsController();
routes.delete("/clients", ensureTableNotEmpty('clients'), clearClientsController.handle);

export { routes };