import { Select } from "@/components/ui";
import { useState } from "react";

export default function Dropdown_For_Nav() {
  let [value, setValue] = useState("");
  const status = [
    { label: "YES", value: 1 },
    { label: "NO", value: 0 },
  ];
  return (
    <>
      <Select
        size="sm"
        className="w-48"
        value={value}
        options={status}
        onChange={(option) => {
          setValue(option);
        }}
      ></Select>
    </>
  );
}
