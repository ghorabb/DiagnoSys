import Modal from "../../ui/Modal";
import PatientForm from "./PatientForm";

function AddPatient() {
  return (
    <Modal>
      <Modal.Open opens="appointment-form">
        <button className="p-2 bg-customBlue text-white rounded-md md:rounded-lg w-full md:w-auto text-sm md:text-base">
          Add Patient
        </button>
      </Modal.Open>
      <Modal.Window name="appointment-form">
        <div className="max-h-[90vh] overflow-y-auto p-4">
          <PatientForm />
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default AddPatient;
