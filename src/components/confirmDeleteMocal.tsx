import { ReactNode, useState } from "react";
import { deleteTicket } from "../api/tickets";
import DismissModal from "./dismissModal";

interface TicketDeletionModalProps {
  onClose: () => void;
  onDelete: () => void; // Function to handle deletion
  ticket: any; // Message for deletion confirmation
  ticketId: any;
}

const TicketDeletionModal: React.FC<TicketDeletionModalProps> = ({
  onClose,
  onDelete,
  ticket,
  ticketId,
}: TicketDeletionModalProps) => {
  const [dismissModalOpen, setDismissModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditSubmit = async () => {
    try {
      console.log({
        ticket_id: ticketId,
      });
      await deleteTicket({
        ticket_id: ticketId,
      });
      onClose();
      onDelete();
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "An unexpected error occurred while deleting the ticket."
        );
      }
      setDismissModalOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-96">
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-xl font-bold">Delete Ticket</h2>
          <button
            className="text-gray-400 hover:text-white absolute top-0 right-0 p-4"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <h1 className="mb-4 text-xl font-bold text-black">
            Do you want to Delete This Ticket?
          </h1>
          <div className="flex justify-end">
            <button
              onClick={handleEditSubmit}
              className="px-6 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 mr-2"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {dismissModalOpen && (
        <DismissModal
          errorMsg={errorMessage}
          isOpen={dismissModalOpen}
          onClose={() => setDismissModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TicketDeletionModal;
