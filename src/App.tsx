import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createTicket, getAllTicket } from "./api/tickets";
import "./styles/global.scss";

const App: FC = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const {
    isLoading: isLoadingAllTicket,
    isError: isErrorAllTicket,
    data: allTicketData,
    refetch: refetchAllTicket,
  } = useQuery({
    queryKey: ["allTicket"],
    queryFn: getAllTicket,
    enabled: false,
  });

  const {
    isLoading: isLoadingCreateTicket,
    isError: isErrorCreateTicket,
    data: createTicketData,
    refetch: refetchCreateTicket,
  } = useQuery({
    queryKey: ["createTicket"],
    queryFn: createTicket,
    enabled: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTicket(formData);
    refetchCreateTicket();
    setFormData({ title: "", description: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "accepted":
        return "bg-green-500";
      case "resolved":
        return "bg-purple-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTimeStamp = (timeStamp: string) => {
    const date = new Date(timeStamp);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto">
      <div className="mt-8 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ticket Management System</h1>
          <br />
          <h1 className="text-1xl font-bold">
            Create Ticket By Fill the Fields
          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border border-gray-300 rounded-md px-8 py-4 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border border-gray-300 rounded-md px-8 py-4 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div className="mt-8 mb-4 flex justify-between items-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
          >
            Create Ticket
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
            onClick={() => refetchAllTicket()}
          >
            Refresh Tickets
          </button>
        </div>
      </form>
      {isLoadingAllTicket && <p>Loading...</p>}
      {isErrorAllTicket && <p>Error occurred, please try again.</p>}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-4">#</th>
            <th className="px-4 py-4">Title</th>
            <th className="px-4 py-4">Description</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Created Time</th>
            <th className="px-4 py-4">Latest Time</th>
          </tr>
        </thead>
        <tbody>
          {allTicketData?.map((ticket: any, index: number) => (
            <tr key={index} className="bg-gray-900 text-white gap-[50px]">
              <td className="px-8 py-4">{ticket.ticket_id}</td>
              <td className="px-8 py-4">{ticket.title}</td>
              <td className="px-8 py-4">{ticket.description}</td>
              <td className="px-8 py-4">
                <div
                  className={`rounded-md px-2 py-1 ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </div>
              </td>
              <td className="px-8 py-4">
                {formatTimeStamp(ticket.created_date)}
              </td>
              <td className="px-8 py-4">
                {formatTimeStamp(ticket.updated_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
