import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import PropTypes from "prop-types";

// Constants
const statuses = [
  { label: "In progress", value: "inProgress" },
  { label: "Done", value: "done" },
  { label: "Not Done", value: "notDone" },
];

const statusColorLabel = {
  done: { color: "bg-green-600", label: "Done" },
  inProgress: { color: "bg-yellow-600", label: "In progress" },
  notDone: { color: "bg-red-600", label: "Not Done" },
  todo: { color: "bg-neutral-600", label: "To do" },
  pending: {color: "bg-neutral-600", label: "Pending"},
};

const Task = ({ title, description, status, onStatusChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const handleDropdownChange = (dropdown, newValue) => {
    setSelectedFilters({ ...selectedFilters, [dropdown]: newValue });
    onStatusChange(newValue);
  };

  useState(() => {
    setSelectedFilters({ ...selectedFilters, statusOfTask: status });
  }, []);

  return (
    <div className="bg-[#222] px-2 my-2 rounded">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex w-full items-center justify-between">
              <p>{title}</p>
              <Select
                onValueChange={(value) =>
                  handleDropdownChange("statusOfTask", value)
                }
              >
                <SelectTrigger
                  className={`w-[110px] h-[30px] ${
                    statusColorLabel[selectedFilters?.statusOfTask]?.color
                  }`}
                >
                  <SelectValue placeholder={statusColorLabel[status]?.label} />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// Proptypes
Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};
export default Task;
