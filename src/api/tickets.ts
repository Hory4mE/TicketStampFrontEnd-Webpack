import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";


export async function getAllTicket(): Promise<any> {


  const token: string = localStorage.getItem("token")!;
  if (token) {
    const params: any = jwtDecode(token);
    const user_id = params.user_id;
    const tickets = await axios.get(`http://${process.env.HOST}:${process.env.PORT}/v1/tickets?user_id=${user_id}`,
      {
        headers: {
          token: token,
        }
      }
    );
    return tickets.data;

  } else {
    const tickets = await axios.get(`http://${process.env.HOST}:${process.env.PORT}/v1/tickets`,
      {
        headers: {
          token: token,
        }
      }
    );
    return tickets.data;
  }
}

export async function createTicket(newTicketData: any) {
  try {
    const token: string = localStorage.getItem("token")!;

    const tickets = await axios.post(
      `http://${process.env.HOST}:${process.env.PORT}/v1/tickets`,
      newTicketData, {
      headers: {
        token: token
      }
    }
    );
    console.log("CREATED : " + tickets);
  } catch (e) { }
}

export async function updateTicketStatus(newStatusData: {
  ticket_id: string;
  status: string;
}) {
  try {
    const token: string = localStorage.getItem("token")!;

    const { ticket_id, status } = newStatusData;
    const id = ticket_id;
    const data = { status };
    const tickets = await axios.patch(
      `http://${process.env.HOST}:${process.env.PORT}/v1/tickets/${id}/status`,
      data,
      {
        headers: {
          token: token
        }
      }
    );
  } catch (e) { }
}

export async function updateTicket(newStatusData: {
  ticket_id: string;
  title: string;
  description: string;
}) {
  try {
    const token: string = localStorage.getItem("token")!;

    const { ticket_id, title, description } = newStatusData;
    const id = ticket_id;
    const data = { title, description };
    const tickets = await axios.patch(
      `http://${process.env.HOST}:${process.env.PORT}/v1/tickets/${id}`,
      data,
      {
        headers: {
          token: token
        }
      }
    );
  } catch (e) { }
}


export async function deleteTicket(ticketId: { ticket_id: string }) {
  try {
    const token: string = localStorage.getItem("token")!;

    const id = ticketId.ticket_id;
    const ticket = await axios.delete(`http://${process.env.HOST}:${process.env.PORT}/v1/tickets/${id}`, {
      headers: {
        token: token
      }
    });


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

export async function login(username: string, password: string) {
  try {
    const token = await axios.post(`http://${process.env.HOST}:${process.env.PORT}/v1/users/login`, {
      "username": username,
      "password": password,
    })
    console.log('Login successful');
    if (token) {
      localStorage.setItem("token", token.data.token)

    }
  } catch (e) {
    
  }
}