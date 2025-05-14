export enum TicketStatus {
    NEW = "NEW",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export interface CreateTicketRequest {
    title: string;
    content: string;
}

export interface UpdateTicketStatusRequest {
    solution?: string;
    cancelReason?: string;
}

export interface TicketFilter {
    startDate?: Date;
    endDate?: Date;
    date?: Date;
}

export interface TicketResponse {
    id: number;
    title: string;
    content: string;
    status: TicketStatus;
    createdAt: Date;
    updatedAt: Date;
    solution?: string;
    cancelReason?: string;
}
