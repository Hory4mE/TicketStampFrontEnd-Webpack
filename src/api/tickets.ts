import axios from "axios";
import { resolve } from "path";

export async function getAllTicket(): Promise<any> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  const tickets = await axios.get("http://localhost:5500/tickets");
  return tickets.data;
}

export async function createTicket(newTicketData: any): Promise<any> {
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    const tickets = await axios.post(
      "http://localhost:5500/tickets",
      newTicketData
    );
    console.log(tickets);

    return tickets;
  } catch (e) {
    return e;
  }
}
