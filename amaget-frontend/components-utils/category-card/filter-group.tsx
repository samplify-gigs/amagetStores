"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FilterGroup({ title, options, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-3.5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-[13px] font-semibold text-gray-800"
      >
        {title}
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open && (
        <div className="mt-2.5 space-y-2">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 text-[12.5px] text-gray-600 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#fc0056]"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
