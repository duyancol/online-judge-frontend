import React from "react";

export function Select({ label, children, defaultValue, onValueChange }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <select
        defaultValue={defaultValue}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full border rounded p-2"
      >
        {children}
      </select>
    </div>
  );
}

export function SelectItem({ children, value }) {
  return <option value={value}>{children}</option>;
}
