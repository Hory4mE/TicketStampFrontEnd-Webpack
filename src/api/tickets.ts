import axios, { AxiosError } from "axios";


export async function getAllTicket(): Promise<any> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  console.log("JAUSDF : ", process.env.HOST);
  // const tickets = await axios.get("http://localhost:5500/tickets");
  const token = await axios.post(`http://${process.env.HOST}:${process.env.PORT}/v1/users/login`, {
    "username": "username test2",
    "password": "password test2"
  }
  )
  console.log(token.data.token)
  const tickets = await axios.get(`http://${process.env.HOST}:${process.env.PORT}/v1/tickets`,
    {
      headers: {
        token: token.data.token,
      }
    }
  );
  return tickets.data;
}

export async function createTicket(newTicketData: any) {
  try {
    const tickets = await axios.post(
      "http://localhost:5500/tickets",
      newTicketData
    );
    console.log(tickets);
  } catch (e) { }
}

export async function updateTicketStatus(newStatusData: {
  ticket_id: string;
  status: string;
}) {
  try {
    const { ticket_id, status } = newStatusData;
    const id = ticket_id;
    const data = { status };
    const tickets = await axios.put(
      `http://localhost:5500/tickets/status/${id}`,
      data
    );
  } catch (e) { }
}

export async function updateTicket(newStatusData: {
  ticket_id: string;
  title: string;
  description: string;
}) {
  try {
    const { ticket_id, title, description } = newStatusData;
    const id = ticket_id;
    const data = { title, description };
    const tickets = await axios.put(
      `http://localhost:5500/tickets/${id}`,
      data
    );
  } catch (e) { }
}


export async function deleteTicket(ticketId: { ticket_id: string }) {
  try {
    const id = ticketId.ticket_id;
    const ticket = await axios.delete(`http://localhost:5500/tickets/${id}`);
  } catch (error) {
    // console.error("Error deleting ticket:", error);
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        throw axiosError.response;
      } else {
        throw (axiosError.message)
      }
    } else {
      throw new Error("unexpected error occurred : " + error)
    }
  }
}
