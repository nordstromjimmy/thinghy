import React from "react";

type FieldControlsProps = {
  index: number;
  total: number;
  fieldId: string;
  onMove: (index: number, direction: number) => void;
  onRemove: (id: string) => void;
};

export default function FieldControls({
  index,
  total,
  fieldId,
  onMove,
  onRemove,
}: FieldControlsProps) {
  return (
    <div className="flex justify-between mt-1">
      <div className="flex gap-1">
        <button
          disabled={index === 0}
          onClick={() => onMove(index, -1)}
          className="text-xs bg-gray-700 px-2 py-1 rounded disabled:opacity-40"
        >
          ↑
        </button>
        <button
          disabled={index === total - 1}
          onClick={() => onMove(index, 1)}
          className="text-xs bg-gray-700 px-2 py-1 rounded disabled:opacity-40"
        >
          ↓
        </button>
      </div>
      <button
        onClick={() => onRemove(fieldId)}
        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500"
      >
        ×
      </button>
    </div>
  );
}
