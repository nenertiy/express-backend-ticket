import { CreateTicketRequest, UpdateTicketStatusRequest, TicketFilter } from "./ticket.types";
import { TicketStatus } from "../../../generated/client";
import prisma from "../../prisma/client";

export const createTicket = (data: CreateTicketRequest) => {
    return prisma.ticket.create({
        data: {
            ...data,
            status: TicketStatus.NEW,
        },
    });
};

export const updateTicketStatus = (
    id: number,
    data: Partial<UpdateTicketStatusRequest> & { status: TicketStatus }
) => {
    return prisma.ticket.update({
        where: { id },
        data,
    });
};

export const findTickets = (filter: TicketFilter) => {
    const { startDate, endDate, date } = filter;
    const where: any = {};

    if (date) {
        where.createdAt = {
            gte: new Date(date),
            lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
        };
    } else if (startDate && endDate) {
        where.createdAt = {
            gte: new Date(startDate),
            lte: new Date(endDate),
        };
    }

    return prisma.ticket.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });
};

export const cancelAllInProgress = () => {
    return prisma.ticket.updateMany({
        where: { status: TicketStatus.IN_PROGRESS },
        data: {
            status: TicketStatus.CANCELLED,
            cancelReason: "Cancelled by system",
        },
    });
};
