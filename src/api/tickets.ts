import axios, { HttpStatusCode } from "axios";
import { resolve } from "path";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function getAllTicket(): Promise<any> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  const tickets = await axios.get("http://localhost:5500/tickets");
  return tickets.data;
}

export async function createTicket(newTicketData: any): Promise<void> {
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    const tickets = await axios.post(
      "http://localhost:5500/tickets",
      newTicketData
    );
    console.log(tickets);
  } catch (e) {
    throw HttpStatusCode.BadRequest;
  }
}
