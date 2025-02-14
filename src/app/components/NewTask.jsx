import { Button } from "@/components/ui/button";
import React from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  { label: "Personal", value: "personal" },
  { label: "Work", value: "work" },
  { label: "Academics", value: "academics" },
];

const defaultInputValues = {
  title: "",
  description: "",
  category: "",
  date: new Date(),
};

const NewTask = () => {
  const [inputData, setInputData] = useState(defaultInputValues);

  const handleInputChange = (field, value) => {
    setInputData({ ...inputData, [field]: value });
    console.log(field, value);
  };

  const handleOnCreate = () => {
    console.log("API CALLL :: ", inputData);
  };

  const handleResetInputs = () => {
    setInputData(defaultInputValues);
  };

  return (
    <div className="w-100 h-full flex items-center justify-center">
      <div className="w-1/2 flex flex-col gap-4">
        <div className="border border-slate-600 rounded bg-[#293947]">
          <div>
            <div className="p-4 flex justify-between items-center">
              <h3>Create New Task</h3>

              <h3>X</h3>
            </div>
            <div className="w-full h-[.5px] bg-slate-600"></div>

            <div className="p-4 h-[60vh] overflow-auto flex flex-col gap-4">
              {/* Inputs */}
              <Input
                className={"bg-[#222] py-6 "}
                placeholder={"Title"}
                onChange={(e) => handleInputChange("title", e.target.value)}
                value={inputData.title}
              />
              <Textarea
                className={"bg-[#222]"}
                placeholder={"Description"}
                rows={16}
                value={inputData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />

              <div className="flex justify-between gap-4 w-full">
                <Select
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  value={inputData.category}
                  defaultValue="work"
                >
                  <SelectTrigger className={`w-full bg-[#222] py-6 `}>
                    <SelectValue placeholder="Work" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <DatePicker
                  className={
                    "w-full py-6  justify-start text-left font-normal text-zinc-700 bg-[#222]"
                  }
                  date={inputData.date}
                  setDate={(date) => handleInputChange("date", date)}
                />
              </div>
            </div>

            <div className="w-full h-[.5px] bg-slate-600"></div>

            <div className="p-2 flex justify-end items-center gap-3">
              <Button
                className={"bg-red-600 hover:bg-red-900"}
                onClick={handleResetInputs}
              >
                Clear
              </Button>
              <Button
                className={"bg-green-800 hover:bg-green-900"}
                onClick={handleOnCreate}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
