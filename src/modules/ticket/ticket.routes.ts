import { Router } from "express";
import {
    createTicket,
    takeTicketInProgress,
    completeTicket,
    cancelTicket,
    getTickets,
    cancelAllInProgressTickets,
} from "./ticket.controller";

const router = Router();

router.post("/", createTicket);
router.patch("/:id/take", takeTicketInProgress);
router.patch("/:id/complete", completeTicket);
router.patch("/:id/cancel", cancelTicket);
router.get("/", getTickets);
router.post("/cancel-all", cancelAllInProgressTickets);

export default router;
