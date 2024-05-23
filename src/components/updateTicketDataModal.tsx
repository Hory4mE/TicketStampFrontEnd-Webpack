/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateTicket } from "../api/tickets";

interface NotiModalProps {
  onClose: () => void;
  ticket: any;
  ticketId: any;
  updateTicketData: () => void;
}

function UpdateDataModal({
  onClose,
  ticket,
  ticketId,
  updateTicketData,
}: NotiModalProps) {
  const [newTitle, setNewTitle] = useState(ticket.title);
  const [newDescription, setNewDescription] = useState(ticket.description);

  const handleEditSubmit = async () => {
    try {
      console.log({
        ticket_id: ticketId,
        title: newTitle,
        description: newDescription,
      });
      await updateTicket({
        ticket_id: ticketId,
        title: newTitle,
        description: newDescription,
      });
      onClose();
      updateTicketData();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-96">
        <div className="bg-grey-800 text-white p-6">
          <h2 className="text-xl font-bold">Edit Ticket</h2>
          <button
            className="text-grey-400 hover:text-white absolute top-0 right-0 p-4"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-grey-700 text-sm font-bold mb-2">
              Update Title:
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-4 py-2 w-full border border-grey-300 rounded-md bg-white text-grey-900 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-grey-700 text-sm font-bold mb-2">
              Update Description:
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="px-4 py-2 w-full h-32 border border-grey-300 rounded-md bg-white text-grey-900 focus:outline-none focus:ring focus:ring-blue-400"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleEditSubmit}
              disabled={!newTitle || !newDescription}
              className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 mr-2"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-grey-300 text-grey-800 rounded-md shadow hover:bg-grey-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDataModal;
