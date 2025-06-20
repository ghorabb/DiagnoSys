import React from "react";

const TextInput = React.forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={ref}
        {...rest}
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
      />
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
