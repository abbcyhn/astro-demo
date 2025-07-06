import { useState } from "react";

export default function WhatIsYourAnswer() {
  const [choice, setChoice] = useState("");

  const responses = {
    A: "❗ If you reveal the number first, you will lose the chance to build leverage later.",
    B: "❗ Most companies will focus on the lower end of your range. Because they assume that’s acceptable to you.",
    C: "👌 If you do it right, it the smartest tactic to get the highest offer.",
  };

  return (
    <div className="my-8">
      <select
        id="salary-select"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        className="block mt-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
      >
        <option value="">-- Choose your answer --</option>
        <option value="A">A) I give a number</option>
        <option value="B">B) I give a range</option>
        <option value="C">C) I dodge the question</option>
      </select>
      <small>🔒 Your answer will not be stored anywhere !</small>


      {choice && (
        <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg min-h-[60px]">
          {responses[choice]}
        </div>
      )}
    </div>
  );
}
