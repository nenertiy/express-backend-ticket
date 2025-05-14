import { TicketStatus } from "../../../generated/client";
import * as ticketRepository from "./ticket.repository";
import { CreateTicketRequest, TicketFilter } from "./ticket.types";

export const createTicket = (data: CreateTicketRequest) => {
    return ticketRepository.createTicket(data);
};

export const takeTicketInProgress = (id: number) => {
    return ticketRepository.updateTicketStatus(id, { status: TicketStatus.IN_PROGRESS });
};

export const completeTicket = (id: number, solution: string) => {
    return ticketRepository.updateTicketStatus(id, { status: TicketStatus.COMPLETED, solution });
};

export const cancelTicket = (id: number, cancelReason: string) => {
    return ticketRepository.updateTicketStatus(id, {
        status: TicketStatus.CANCELLED,
        cancelReason,
    });
};

export const getTickets = (filter: TicketFilter) => {
    return ticketRepository.findTickets(filter);
};

export const cancelAllInProgressTickets = () => {
    return ticketRepository.cancelAllInProgress();
};
