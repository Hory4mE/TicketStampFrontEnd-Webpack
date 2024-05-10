import { ReactNode } from "react";

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const createTicketModal: React.FC<TicketModalProps> = ({
  open,
  onClose,
  children,
}: TicketModalProps) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-row">
          <div className="modal-content">{children}</div>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default createTicketModal;
