import { Search } from "lucide-react";
import AddPatient from "./AddPatient";

function PatientsListHeader({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex flex-wrap items-center justify-between w-full gap-6 mb-4">
      <div className="flex flex-col w-full md:flex-row md:items-center gap-2">
        <div className="relative w-full md:flex-1">
          <input
            type="text"
            placeholder="Enter patient name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={16}
          />
        </div>
        <AddPatient />
      </div>
    </div>
  );
}

export default PatientsListHeader;
