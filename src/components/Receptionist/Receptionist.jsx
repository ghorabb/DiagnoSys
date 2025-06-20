import CustomCalendar from "../../ui/CustomCalendar";
import Appointment from "./Appointment";
import PatientList from "./PatientList";

function Receptionist() {
  return (
    <div className="p-6 space-y-6">
      <CustomCalendar />
      <Appointment />
      <PatientList />
    </div>
  );
}

export default Receptionist;
