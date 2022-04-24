import { ensureTableNotEmpty } from './middlewares/ensureTableNotEmpty';
import { ensureTableEmpty } from './middlewares/ensureTableEmpty';
import { Router } from "express";
import { ClearClientsController } from "./modules/Clientes/useCases/clear/clearClientsController";
import { PopulateClientsController } from "./modules/Clientes/useCases/populate/populateClientsController";
import { PopulateProductsController } from './modules/Produtos/useCases/populate/populateProductsController';
import { ClearProductsController } from './modules/Produtos/useCases/clear/clearProductsController';

const routes = Router();

// Clientes
const populateClientsController = new PopulateClientsController();
routes.post("/clients", ensureTableEmpty('clients'), populateClientsController.handle);

const clearClientsController = new ClearClientsController();
routes.delete("/clients", ensureTableNotEmpty('clients'), clearClientsController.handle);

// Produtos
const populateProductsController = new PopulateProductsController();
routes.post("/products", ensureTableEmpty('products'), populateProductsController.handle);

const clearProductsController = new ClearProductsController();
routes.delete("/products", ensureTableNotEmpty('products'), clearProductsController.handle);

export { routes };