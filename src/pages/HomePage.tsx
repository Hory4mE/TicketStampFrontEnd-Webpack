import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createTicket,
  getAllTicket,
  updateTicket,
  updateTicketStatus,
} from "../api/tickets";
import CreateTicketModal from "../components/createTicketModal";
import NotiModal from "../components/updateTicketModal";
import { ITickets } from "../components/ITickets";
import UpdateDataModal from "../components/updateTicketDataModal";
import TicketDeletionModal from "../components/confirmDeleteMocal";

interface ticketProps {
  tickets: ITickets[];
}

const HomePage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatusModal, setStatusUpdateModal] = useState(false);
  const [updateTicketModal, setUpdateTicketModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateTicket = async () => {
    await createTicket(formData);
    refetchAllTicket();
    setFormData({ title: "", description: "" });
  };

  const handleUpdateTicketStatus = async (ticketId: string, status: string) => {
    await updateTicketStatus({
      ticket_id: ticketId,
      status,
    });
    console.log({
      ticket_id: ticketId,
      status,
    });
    refetchAllTicket();
    setStatusUpdateModal(false);
  };

  const handleUpdateTicket = async (
    ticketId: string,
    title: string,
    description: string
  ) => {
    await updateTicket({
      ticket_id: ticketId,
      title,
      description,
    });
    console.log({
      ticket_id: ticketId,
      title,
      description,
    });
    refetchAllTicket();
    setStatusUpdateModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "IN_PROGRESS":
        return "bg-purple-500";
      case "COMPLETED":
        return "bg-green-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray";
    }
  };

  const formatTimeStamp = (timeStamp: Date) => {
    const date = new Date(timeStamp);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto">
      <div className="mt-8 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ticket Management System</h1>
          <br />
        </div>
      </div>
      <CreateTicketModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateTicket();
          }}
          className="mb-8"
        >
          <h1 className="text-1xl font-bold">
            Create Ticket By Fill the Fields
          </h1>
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
          </div>
        </form>
      </CreateTicketModal>
      <button
        className="px-4 py-2 mb-8 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        onClick={() => refetchAllTicket()}
      >
        Refresh Tickets
      </button>
      <button
        className="px-4 py-2 mb-8 ml-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-400"
        onClick={() => setIsModalOpen(true)}
      >
        Create Tickets
      </button>

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
            <th className="px-4 py-4" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allTicketData?.map(
            (ticket: ITickets, index: number) =>
              !ticket.is_delete && (
                <tr key={index} className="bg-gray-900 text-white gap-[50px]">
                  <td className="px-8 py-4">{ticket.ticket_id}</td>
                  <td className="px-8 py-4">{ticket.title}</td>
                  <td className="px-8 py-4">{ticket.description}</td>
                  <td className="px-8 py-4">
                    <button
                      onClick={() => {
                        setSelectedTicketId(ticket.ticket_id);
                        setStatusUpdateModal(true);
                      }}
                      className={`rounded-md px-4 py-1 ${getStatusColor(
                        ticket.status
                      )} hover:opacity-75`}
                    >
                      {ticket.status}
                    </button>
                    {updateStatusModal &&
                      selectedTicketId === ticket.ticket_id && (
                        <NotiModal
                          onClose={() => setStatusUpdateModal(false)}
                          tickets={ticket.status}
                          updateTicketStatus={(status: any) =>
                            handleUpdateTicketStatus(ticket.ticket_id, status)
                          }
                        />
                      )}
                  </td>
                  <td className="px-8 py-4">
                    {formatTimeStamp(ticket.created_date)}
                  </td>
                  <td className="px-8 py-4">
                    {formatTimeStamp(ticket.updated_date)}
                  </td>
                  <td className="px-8 py-4">
                    {" "}
                    <button
                      className="px-4 py-2 mb-8 ml-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-400"
                      onClick={() => {
                        setSelectedTicketId(ticket.ticket_id);
                        setUpdateTicketModal(true);
                      }}
                    >
                      Edit
                    </button>
                    {updateTicketModal &&
                      selectedTicketId === ticket.ticket_id && (
                        <UpdateDataModal
                          onClose={() => setUpdateTicketModal(false)}
                          ticket={ticket}
                          ticketId={ticket.ticket_id}
                          updateTicketData={refetchAllTicket}
                        />
                      )}
                  </td>
                  <td className="px-8 py-4">
                    {" "}
                    <button
                      className="px-4 py-2 mb-8 ml-4 bg-red-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-400"
                      onClick={() => {
                        setSelectedTicketId(ticket.ticket_id);
                        setConfirmDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                    {confirmDeleteModal &&
                      selectedTicketId === ticket.ticket_id && (
                        <TicketDeletionModal
                          onClose={() => setConfirmDeleteModal(false)}
                          ticket={ticket}
                          ticketId={ticket.ticket_id}
                          onDelete={refetchAllTicket}
                        />
                      )}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
