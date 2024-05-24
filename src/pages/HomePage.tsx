import {
  NcAlert,
  NcButton,
  NcCard,
  NcCardBody,
  NcCardTitle,
} from "@nipacloud/nc-design-system-react";
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
              required
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

      {isLoadingAllTicket && (
        <NcButton type="text" loading>
          Text
        </NcButton>
      )}
      {isErrorAllTicket && <NcAlert>An Unexpected Error Occurred</NcAlert>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTicketData?.map(
          (ticket: ITickets, index: number) =>
            !ticket.is_delete && (
              <NcCard key={index} shadow={2}>
                <NcCardTitle>
                  <div>{ticket.title}</div>
                </NcCardTitle>
                <NcCardBody>
                  <p>
                    <strong>Description:</strong> {ticket.description}
                  </p>
                  <p>
                    <strong>Status:</strong>
                  </p>
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
                  <p>
                    <strong>Created Time:</strong>{" "}
                    {formatTimeStamp(ticket.created_date)}
                  </p>
                  <p>
                    <strong>Latest Time:</strong>{" "}
                    {formatTimeStamp(ticket.updated_date)}
                  </p>
                  <div className="flex justify-end space-x-4 mt-4">
                    <NcButton
                      className="bg-green-500 text-white"
                      onClick={() => {
                        setSelectedTicketId(ticket.ticket_id);
                        setUpdateTicketModal(true);
                      }}
                    >
                      Edit
                    </NcButton>
                    {updateTicketModal &&
                      selectedTicketId === ticket.ticket_id && (
                        <UpdateDataModal
                          onClose={() => setUpdateTicketModal(false)}
                          ticket={ticket}
                          ticketId={ticket.ticket_id}
                          updateTicketData={refetchAllTicket}
                        />
                      )}
                    <NcButton
                      className="bg-red-500 text-white"
                      onClick={() => {
                        setSelectedTicketId(ticket.ticket_id);
                        setConfirmDeleteModal(true);
                      }}
                    >
                      Delete
                    </NcButton>
                    {confirmDeleteModal &&
                      selectedTicketId === ticket.ticket_id && (
                        <TicketDeletionModal
                          onClose={() => setConfirmDeleteModal(false)}
                          ticket={ticket}
                          ticketId={ticket.ticket_id}
                          onDelete={refetchAllTicket}
                        />
                      )}
                  </div>
                </NcCardBody>
              </NcCard>
            )
        )}
      </div>
    </div>
  );
};

export default HomePage;
