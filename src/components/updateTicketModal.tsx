/* eslint-disable react/prop-types */
import "@nipacloud/nc-design-system/style";
import { useState } from "react";

interface NotiModalProps {
  onClose: () => void;
  tickets: any;
  updateTicketStatus: (status: string) => void;
}

function NotiModal({ onClose, tickets, updateTicketStatus }: NotiModalProps) {
  const [newStatus, setNewStatus] = useState("");
  const isConfirmDisabled = newStatus === "please select"; // Define condition for disabling Confirm button

  const handleEditSubmit = async (e: any) => {
    console.log(e.target.value);
    const data = await e.target.value;
    onClose();
    updateTicketStatus(data);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-grey-1000 bg-opacity-70">
      <div className="bg-grey-900 bg-opacity-50 p-8 rounded-lg shadow-lg">
        <span
          className="text-grey-500 text-2xl absolute top-0 right-0 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-white text-2xl font-bold">Notification</h2>
        <div className="mt-4">
          <p className="text-white">Select new Status to update data</p>
          <p className="text-white">Select new status:</p>
          <select
            className="px-4 py-2 rounded-md border border-grey-300 bg-white text-grey-900 focus:outline-none focus:ring focus:ring-blue-400"
            onChange={(e) => handleEditSubmit(e)}
          >
            <option value={tickets.status}>{tickets.status}</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NotiModal;
