import React, { useState } from "react";

interface DismissModalProps {
  errorMsg: string;
  isOpen: boolean;
  onClose: () => void;
}

const DismissModal: React.FC<DismissModalProps> = ({
  errorMsg,
  isOpen,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  const closeModal = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="modal z-50 bg-white rounded-lg p-8 max-w-md w-full">
            <span
              className="absolute top-0 right-0 m-3 cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-4">{errorMsg}</h2>
            <p className="text-gray-700 mb-4">
              Cannot remove this Completed Ticket
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DismissModal;
