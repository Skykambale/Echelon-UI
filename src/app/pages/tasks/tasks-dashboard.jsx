import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const TaskDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [selectedFilters, setSelectedFilters] = useState({});

  const filters = [
    { label: "Productive", value: "productive" },
    { label: "Super Productive", value: "super productive" },
  ];

  const handleDropdownChange = (dropdown, newValue) => {
    setSelectedFilters({ ...selectedFilters, [dropdown]: newValue });
  };
  const handleChangeDateByOne = (date, type) => {
    if (type === "next") {
      setDate(new Date(date.setDate(date.getDate() + 1)));
    } else if (type === "previous") {
      setDate(new Date(date.setDate(date.getDate() - 1)));
    }
  };
  return (
    <div className="w-100 h-full flex items-center justify-center">
      <div className="w-1/2 flex flex-col gap-4">
        <div className="flex justify-between items-center p-2 ">
          <Button
            size="icon"
            onClick={() => handleChangeDateByOne(date, "previous")}
          >
            <ChevronLeft />
          </Button>
          <DatePicker date={date} setDate={setDate} />
          <Button
            size="icon"
            onClick={() => handleChangeDateByOne(date, "next")}
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="border border-slate-600 rounded">
          <div>
            <div className="p-2 flex justify-between items-center">
              <Select
                onValueChange={(value) => handleDropdownChange("filter", value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filters" />
                </SelectTrigger>
                <SelectContent>
                  {filters.map((filter) => (
                    <SelectItem value={filter.value} key={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  handleDropdownChange("statusOfDay", value)
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status of Day" />
                </SelectTrigger>
                <SelectContent>
                  {filters.map((filter) => (
                    <SelectItem value={filter.value} key={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full h-[.5px] bg-slate-600"></div>
            <div className="p-2 h-[60vh]">
              {/* here will be the list of tasks */}
            </div>
            <div className="w-full h-[.5px] bg-slate-600"></div>
            <div className="p-2 flex justify-end items-center">
              <Button className={"bg-green-800 hover:bg-green-900"}>
                Add new Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
