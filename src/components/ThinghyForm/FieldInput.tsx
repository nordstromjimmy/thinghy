import { Field } from "@/types/Field";
import { getInputAttributes } from "@/utils/getInputAttributes";

type FieldInputProps = {
  field: Field;
  onChange: (id: string, updatedField: Field) => void;
};

export default function FieldInput({ field, onChange }: FieldInputProps) {
  const inputProps = getInputAttributes(field.type);

  return (
    <input
      {...inputProps}
      value={field.value}
      onChange={(e) => onChange(field.id, { ...field, value: e.target.value })}
      className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
    />
  );
}
