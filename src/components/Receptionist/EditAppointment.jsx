import Modal from "../../ui/Modal";
import { FaRegCalendarAlt } from "react-icons/fa";
import EditAppForm from "./EditAppForm";

function EditAppointment({ appt }) {
  return (
    <Modal>
      <Modal.Open opens="appointment-form">
        <button className="px-3 py-1 bg-customBlue text-white rounded-lg flex items-center gap-1">
          <FaRegCalendarAlt className="text-base" />
          Reschedule
        </button>
      </Modal.Open>
      <Modal.Window name="appointment-form">
        <div className="max-h-[90vh] overflow-y-auto p-4">
          <EditAppForm appt={appt} />
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default EditAppointment;
