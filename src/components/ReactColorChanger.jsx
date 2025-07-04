import { useState } from "react";

export default function SalaryExpectation() {
  const [choice, setChoice] = useState("");

  const responses = {
    A: "❌ You should not tell it!",
    B: "😐 Hmm, not exactly.",
    C: "✅ You're close! Now let me share with you my experience...",
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <label htmlFor="salary-select" style={{ fontWeight: "bold" }}>
        How do you usually answer the question:<br />
        <em>“What is your salary expectation?”</em>
      </label>

      <select
        id="salary-select"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        style={{
          display: "block",
          marginTop: "1rem",
          padding: "0.5rem",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <option value="">-- Choose your answer --</option>
        <option value="A">A) I give a number (e.g., X/month or Y/year)</option>
        <option value="B">B) I give a range based on my research</option>
        <option value="C">C) I try to redirect the question</option>
      </select>

      {choice && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#f8f8f8",
            borderRadius: "8px",
            minHeight: "60px",
          }}
        >
          {responses[choice]}
        </div>
      )}
    </div>
  );
}
