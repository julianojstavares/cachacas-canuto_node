import 'dotenv/config'
import express from 'express';
import "express-async-errors";
import { routes } from './routes';

const server = express();

const port = process.env.PORT;

const baseUrl = process.env.BASE_URL;

server.use(express.json());

server.use(routes);

server.use((err: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
   
    if(err instanceof Error) {
        response.status(400).json({
            message: err.message
        });
    }

    return response.status(500).json({
        message: 'Internal server error'
    });

});

server.use(function(req, res, next) {
    res.status(404).send({'message':'Sorry cant find that!'});
});


server.listen(port, () => console.log(`Server started on ${baseUrl}:${port}`));