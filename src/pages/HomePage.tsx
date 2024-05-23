import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { createTicket, getAllTicket, updateTicketStatus } from "../api/tickets";
import TicketDeletionModal from "../components/confirmDeleteMocal";
import CreateTicketModal from "../components/createTicketModal";
import UpdateDataModal from "../components/updateTicketDataModal";
import NotiModal from "../components/updateTicketModal";
import { ITickets } from "../interfaces/ITickets";
import useAuth from "../security/useAuth";
import { checkAdmin } from "../utils/checkroles";

const HomePage: FC = () => {
  const { token } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
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

  useEffect(() => {
    if (checkAdmin(token) === true) {
      setIsAdmin(true);
    }
  }, [token]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-orange-150";
      case "IN_PROGRESS":
        return "bg-navy-150";
      case "COMPLETED":
        return "bg-green-150";
      case "CANCELLED":
        return "bg-red-150";
      default:
        return "bg-grey-150";
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
              className="border border-grey-300 rounded-md px-8 py-4 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border border-grey-300 rounded-md px-8 py-4 focus:outline-none focus:ring focus:ring-blue-400"
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
      {!isAdmin && (
        <button
          className="px-4 py-2 mb-8 ml-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-400"
          onClick={() => setIsModalOpen(true)}
        >
          Create Tickets
        </button>
      )}

      {isLoadingAllTicket && <p>Loading...</p>}
      {isErrorAllTicket && <p>Error occurred, please try again.</p>}
      <table className="w-full">
        <thead>
          <tr className="bg-grey-600 text-white">
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
                <tr key={index} className="bg-grey-500 text-white gap-[50px]">
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
