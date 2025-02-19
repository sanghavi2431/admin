import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import Input from "@/components/ui/Input";

const ReusableForm = ({ title, fields, buttonLabel, backLink }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full max-w-lg">
        <div className="flex justify-center items-center gap-4 mb-10">
          <button className="bg-yellow-300 p-2 rounded-lg">
            <Link to={backLink}>
              <ArrowLeft size={20} className="text-black" />
            </Link>
          </button>
          <h2 className="text-2xl font-bold text-black text-center">
            {title}
          </h2>
        </div>

        <form className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <Input
              key={index}
              type={field.type || "text"}
              placeholder={field.placeholder}
              className="w-full"
            />
          ))}

          <div className="mt-4 flex justify-center items-center">
            <Button
              variant="solid"
              color="black"
              shape="round"
              className="w-1/2 bg-[#00C3DE] hover:bg-[#00c4debd] text-black rounded-full font-semibold"
            >
              {buttonLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReusableForm;
