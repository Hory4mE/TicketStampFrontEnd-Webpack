import { ReactNode } from "react";

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CreateTicketModal: React.FC<TicketModalProps> = ({
  open,
  onClose,
  children,
}: TicketModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="relative bg-white rounded-lg shadow-lg p-6">
        {/* Modal content */}
        <div className="modal-content">{children}</div>
        
        {/* Close button */}
        <button
          className="absolute top-0 right-0 m-4 text-grey-600 hover:text-grey-800 focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CreateTicketModal;
