import { Pencil } from "lucide-react";
import Modal from "../../ui/Modal";
import EditForm from "./EditForm";

function EditPatient({ id }) {
  return (
    <Modal>
      <Modal.Open opens="appointment-form">
        <button className="text-blue-500 hover:text-blue-700 p-2">
          <Pencil size={18} />
        </button>
      </Modal.Open>
      <Modal.Window name="appointment-form">
        <div className="max-h-[90vh] overflow-y-auto p-4">
          <EditForm id={id} />
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default EditPatient;
