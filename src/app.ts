import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import ticketRoutes from "./modules/ticket/ticket.routes";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/tickets", ticketRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

export default app;
