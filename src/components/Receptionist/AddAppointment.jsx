import Modal from "../../ui/Modal";
import AppointmentForm from "./AppointmentForm";

function AddAppointment() {
  return (
    <Modal>
      <Modal.Open opens="appointment-form">
        <button className="p-2 bg-customBlue text-white rounded-lg text-sm sm:text-base">
          Add Appointment
        </button>
      </Modal.Open>
      <Modal.Window name="appointment-form">
        <AppointmentForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddAppointment;
