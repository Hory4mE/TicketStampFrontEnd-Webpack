import { TicketStatus } from "../models/Definitions";

export interface ITickets {
  ticket_id: string;
  title: string;
  description: string;
  status: string;
  created_date: Date;
  updated_date: Date;
  is_delete: boolean;
}

export interface IaddTickets {
  title?: string;
  description?: string;
}

export interface IupdateTickets {
  title?: string;
  description?: string;
}
export interface IupdateTicketStatus {
  status: TicketStatus;
}
