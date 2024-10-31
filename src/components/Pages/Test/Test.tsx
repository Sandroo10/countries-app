import { ChangeEvent, useRef, useState } from "react";

const Test = ({ numInputs }: { numInputs: number }) => {
  const [inputs, setInputs] = useState<string[]>(Array(numInputs).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const isInitialRender = useRef(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) {
      const values = value.split("").slice(0, numInputs - index);
      const newInputs = [...inputs];

      values.forEach((char, i) => {
        newInputs[index + i] = char;
      });
      setInputs(newInputs);

      let nextFocusIndex = index + values.length;
      if (nextFocusIndex >= numInputs) {
        nextFocusIndex = numInputs - 1;
      }
      inputRefs.current[nextFocusIndex]?.focus();
      return;
    }

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (value && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === numInputs - 1 && value) {
      inputRefs.current[index]?.blur();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      const newInputs = [...inputs];

      if (index === numInputs - 1 && inputs[index] === "") {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      }

      if (!inputs[index] && index > 0) {
        newInputs[index - 1] = "";
        setInputs(newInputs);
        inputRefs.current[index - 1]?.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <div style={{ padding: 100, display: "flex", gap: 8 }}>
      {inputs.map((value, index) => (
        <input
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
              if (isInitialRender.current && index === 0) {
                el.focus();
                isInitialRender.current = false;
              }
            }
          }}
          key={index}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          style={{ width: 60, textAlign: "center" }}
        />
      ))}
    </div>
  );
};

export default Test;
