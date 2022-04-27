import { ensureTableNotEmpty } from './middlewares/ensureTableNotEmpty';
import { ensureTableEmpty } from './middlewares/ensureTableEmpty';
import { Router } from "express";
import { ClearClientsController } from "./modules/Clientes/useCases/clear/clearClientsController";
import { PopulateClientsController } from "./modules/Clientes/useCases/populate/populateClientsController";
import { PopulateProductsController } from './modules/Produtos/useCases/populate/populateProductsController';
import { ClearProductsController } from './modules/Produtos/useCases/clear/clearProductsController';
import { SearchClientsController } from './modules/Clientes/useCases/search/searchClientsController';
import { SearchProductsController } from './modules/Produtos/useCases/search/searchProductsController';
import { PopulateSalesController } from './modules/Vendas/useCases/populate/populateSalesController';
import { ClearSalesController } from './modules/Vendas/useCases/clear/clearSalesController';
import { SearchSalesController } from './modules/Vendas/useCases/search/searchSalesController';

const routes = Router();

// Clientes
const populateClientsController = new PopulateClientsController();
routes.post("/clients", ensureTableEmpty('clients'), populateClientsController.handle);

const clearClientsController = new ClearClientsController();
routes.delete("/clients", ensureTableNotEmpty('clients'), clearClientsController.handle);

const searchClientsController = new SearchClientsController();
routes.get("/clients", ensureTableNotEmpty('clients'), searchClientsController.handle);

// Produtos
const populateProductsController = new PopulateProductsController();
routes.post("/products", ensureTableEmpty('products'), populateProductsController.handle);

const clearProductsController = new ClearProductsController();
routes.delete("/products", ensureTableNotEmpty('products'), clearProductsController.handle);

const searchProductsController = new SearchProductsController();
routes.get("/products", ensureTableNotEmpty('products'), searchProductsController.handle);

// Vendas
const populateSalesController = new PopulateSalesController();
routes.post("/sales", ensureTableNotEmpty('clients'), ensureTableNotEmpty('products'), ensureTableEmpty('sales'), populateSalesController.handle);

const clearSalesController = new ClearSalesController();
routes.delete("/sales", ensureTableNotEmpty('sales'), clearSalesController.handle);

const searchSalesController = new SearchSalesController();
routes.get("/sales", ensureTableNotEmpty('sales'), searchSalesController.handle);

export { routes };