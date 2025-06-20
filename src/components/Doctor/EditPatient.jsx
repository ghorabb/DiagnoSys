import Modal from "../../ui/Modal";
import EditForm from "./EditForm";

function EditPatient({ selectedPatient, isLoading }) {
  return (
    <Modal>
      <Modal.Open opens="appointment-form">
        <button className="bg-customBlue text-white px-5 py-2 rounded-md">
          View Record
        </button>
      </Modal.Open>
      <Modal.Window name="appointment-form">
        <div className="max-h-[90vh] overflow-y-auto p-4">
          <EditForm selectedPatient={selectedPatient} isLoading={isLoading} />
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default EditPatient;
