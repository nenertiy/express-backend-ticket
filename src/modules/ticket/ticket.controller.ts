import { Request, Response } from "express";
import { CreateTicketRequest, UpdateTicketStatusRequest, TicketFilter } from "./ticket.types";
import * as ticketService from "./ticket.service";

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         status:
 *           type: string
 *           enum: [NEW, IN_PROGRESS, COMPLETED, CANCELLED]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         solution:
 *           type: string
 *         cancelReason:
 *           type: string
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
export const createTicket = async (req: Request<{}, {}, CreateTicketRequest>, res: Response) => {
    try {
        const { title, content } = req.body;
        const ticket = await ticketService.createTicket({ title, content });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Failed to create ticket" });
    }
};

/**
 * @swagger
 * /api/tickets/{id}/take:
 *   patch:
 *     summary: Take a ticket in progress
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
export const takeTicketInProgress = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const ticketId = parseInt(req.params.id);
        const ticket = await ticketService.takeTicketInProgress(ticketId);
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Failed to update ticket status" });
    }
};

/**
 * @swagger
 * /api/tickets/{id}/complete:
 *   patch:
 *     summary: Complete a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - solution
 *             properties:
 *               solution:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
export const completeTicket = async (
    req: Request<{ id: string }, {}, UpdateTicketStatusRequest>,
    res: Response
) => {
    try {
        const ticketId = parseInt(req.params.id);
        const { solution } = req.body;
        const ticket = await ticketService.completeTicket(ticketId, solution!);
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Failed to complete ticket" });
    }
};

/**
 * @swagger
 * /api/tickets/{id}/cancel:
 *   patch:
 *     summary: Cancel a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cancelReason
 *             properties:
 *               cancelReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
export const cancelTicket = async (
    req: Request<{ id: string }, {}, UpdateTicketStatusRequest>,
    res: Response
) => {
    try {
        const ticketId = parseInt(req.params.id);
        const { cancelReason } = req.body;
        const ticket = await ticketService.cancelTicket(ticketId, cancelReason!);
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel ticket" });
    }
};

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets with optional date filtering
 *     tags: [Tickets]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */
export const getTickets = async (req: Request<{}, {}, {}, TicketFilter>, res: Response) => {
    try {
        const tickets = await ticketService.getTickets(req.query);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tickets" });
    }
};

/**
 * @swagger
 * /api/tickets/cancel-all:
 *   post:
 *     summary: Cancel all tickets in progress
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: All in-progress tickets cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export const cancelAllInProgressTickets = async (req: Request, res: Response) => {
    try {
        const result = await ticketService.cancelAllInProgressTickets();
        res.json({ message: `Cancelled ${result.count} tickets` });
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel tickets" });
    }
};
