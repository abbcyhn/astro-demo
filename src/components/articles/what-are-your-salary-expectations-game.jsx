import React, { useState } from "react";

export default function SalaryNegotiationGame() {
  const [gameState, setGameState] = useState("question"); // question, result
  const [salary, setSalary] = useState(100);
  const [result, setResult] = useState("");
  
  // The "actual" range for this position (hidden)
  const actualRange = { min: 95, max: 130 };

  const evaluateNumberApproach = (value) => {
    if (value < actualRange.min) {
      return {
        outcome: "😬 Ouch! You anchored too low!",
        explanation: `You said $${value}k, but they budgeted $${actualRange.min}-${actualRange.max}k. Now they're thinking: "Great, we can get them cheap!" You just lost $${actualRange.min - value}k+ in potential earnings.`,
        lesson: "When you anchor low, you rarely get more than what you asked for.",
        type: "error"
      };
    } else if (value > actualRange.max) {
      return {
        outcome: "💸 Too high! They're having second thoughts...",
        explanation: `You said $${value}k, but their budget caps at $${actualRange.max}k. The recruiter is now thinking: "Can we afford this person?" You might be eliminated despite being qualified.`,
        lesson: "Anchoring too high can price you out of opportunities.",
        type: "error"
      };
    } else {
      return {
        outcome: "😐 You're in range, but...",
        explanation: `You said $${value}k, which fits their $${actualRange.min}-${actualRange.max}k budget. But here's the problem: you anchored first! They'll likely offer you exactly $${value}k (or slightly less). You could have gotten more.`,
        lesson: "Even when you're 'right', going first limits your upside.",
        type: "warning"
      };
    }
  };

  const handleNumberSubmit = () => {
    const evaluation = evaluateNumberApproach(salary);
    setResult(evaluation);
    setGameState("result");
  };

  const resetGame = () => {
    setGameState("question");
    setSalary(100);
    setResult("");
  };

  if (gameState === "question") {
    return (
      <div className="mx-auto mt-10 p-4 max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 shadow-2xl border border-slate-700">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-xl"></div>
          
          <div className="relative p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4 shadow-lg">
                <span className="text-2xl">💼</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Salary Negotiation Simulator</h2>
              <p className="text-slate-300 text-lg">Test your negotiation skills in this interactive challenge</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-600/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">!</span>
                </div>
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-2">Scenario Setup</h3>
                  <p className="text-slate-200 leading-relaxed">
                    You're interviewing for a <span className="text-emerald-400 font-medium">Senior Developer</span> position. 
                    The recruiter asks the dreaded question...
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 p-6 rounded-xl mb-8 border border-slate-500/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👨‍💼</span>
                </div>
                <span className="text-orange-400 font-medium">Recruiter</span>
              </div>
              <p className="text-white text-lg italic font-medium">
                "So, what are your salary expectations for this role?"
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-emerald-400 font-semibold mb-4 text-lg">
                💰 Your Salary Request
              </label>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600/50">
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={salary}
                  onChange={(e) => setSalary(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer slider-game"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${((salary - 50) / 100) * 100}%, #475569 ${((salary - 50) / 100) * 100}%, #475569 100%)`
                  }}
                />
                <div className="text-center mt-4">
                  <div className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-2xl px-6 py-3 rounded-xl shadow-lg">
                    ${salary}k
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-emerald-500/25"
              onClick={handleNumberSubmit}
            >
              <span className="flex items-center justify-center gap-2">
                <span>🎯</span>
                Submit Your Salary Request
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "result") {
    const getResultStyling = () => {
      switch (result.type) {
        case "error":
          return {
            gradientFrom: "from-red-500",
            gradientTo: "to-rose-500",
            bgColor: "bg-red-900/30",
            textColor: "text-red-100",
            iconBg: "from-red-500 to-rose-500",
            accentColor: "text-red-400"
          };
        case "warning":
          return {
            gradientFrom: "from-amber-500",
            gradientTo: "to-orange-500",
            bgColor: "bg-amber-900/30",
            textColor: "text-amber-100",
            iconBg: "from-amber-500 to-orange-500",
            accentColor: "text-amber-400"
          };
        default:
          return {
            gradientFrom: "from-blue-500",
            gradientTo: "to-cyan-500",
            bgColor: "bg-blue-900/30",
            textColor: "text-blue-100",
            iconBg: "from-blue-500 to-cyan-500",
            accentColor: "text-blue-400"
          };
      }
    };

    const styling = getResultStyling();

    return (
      <div className="mx-auto mt-10 p-4 max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 shadow-2xl border border-slate-700">
          {/* Animated decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-xl animate-pulse"></div>
          
          <div className="relative p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${styling.gradientFrom} ${styling.gradientTo} rounded-full mb-4 shadow-lg`}>
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Negotiation Result</h2>
            </div>

            <div className={`${styling.bgColor} rounded-xl p-6 mb-6 border border-slate-600/50 backdrop-blur-sm`}>
              <h3 className="text-2xl font-bold text-white mb-4">{result.outcome}</h3>
              <p className={`${styling.textColor} leading-relaxed text-lg`}>
                {result.explanation}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-6 mb-8 border border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">💡</span>
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">Key Lesson</h4>
                  <p className="text-purple-100 leading-relaxed font-medium">
                    {result.lesson}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>🔄</span>
                  Try Different Number
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
