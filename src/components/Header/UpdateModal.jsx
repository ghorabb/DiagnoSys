import { Ellipsis } from "lucide-react";
import Modal from "../../ui/Modal";
import UpdateForm from "./UpdateForm";

function UpdateModal({ user }) {
  return (
    <Modal>
      <Modal.Open opens="appointment-form">
        <button className="p-2 border border-[#3B44B2] rounded-lg bg-[#21234e]">
          <Ellipsis className="h-3 w-3 md:h-4 md:w-4" />
        </button>
      </Modal.Open>

      <Modal.Window name="appointment-form">
        <div className="max-h-[90vh] overflow-y-auto p-4">
          <UpdateForm user={user} />
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default UpdateModal;
