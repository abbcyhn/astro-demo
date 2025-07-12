import { useState, useEffect } from 'react';

export default function Game1AnswerWithNumber() {
  const [salaryValue, setSalaryValue] = useState(75000);
  const [feedback, setFeedback] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  const actualRange = { min: 70000, max: 80000 };

  // TODO: Update feedback texts
  const updateFeedback = (value) => {
    if (value < actualRange.min) {
      setFeedback('You lowballed yourself! You either will be given the number you asked for and hired as junior or middle not as senior. Or if you performed well during technical interview you will be hired as senior and will be given lowest end of range $70K');
    } else if (value >= actualRange.min && value < 75000) {
      setFeedback('Recruiter will try to offer lower end to see your reaction based on that. If you persists, recruiter will say lets come back it later');
    } else if (value >= 75000 && value <= actualRange.max) {
      setFeedback('90% they will offer lower range. At this time, they don\'t know you');
    } else {
      setFeedback('You will likely be skipped. Companies typically won\'t consider candidates who ask for significantly more than their budget range, or they may give you an online assignment or tech project to evaluate you and keep you as a backup option.');
    }
  };

  useEffect(() => {
    if (hasInteracted) {
      updateFeedback(salaryValue);
    }
  }, [salaryValue, hasInteracted]);

  const formatSalary = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div>
      {/* Question */}
      <p className="font-medium text-blue-800 dark:text-blue-200 not-prose">Recruiter: What are your salary expectations?</p>

      {/* Answer */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="font-medium text-blue-800 dark:text-blue-200 not-prose whitespace-nowrap">Your Answer:</p>
            
            {/* Salary Slider */}
            <div className="flex-1 w-full sm:max-w-2xl">
              <input
                type="range"
                min="65000"
                max="90000"
                step="500"
                value={salaryValue}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  // Ensure the value is exactly divisible by 500
                  const roundedValue = Math.round(newValue / 500) * 500;
                  setSalaryValue(roundedValue);
                  setHasInteracted(true);
                }}
                className="w-full h-4 bg-slate-700 rounded-lg appearance-none cursor-pointer 
                         [&::-webkit-slider-thumb]:appearance-none 
                         [&::-webkit-slider-thumb]:h-[26px] 
                         [&::-webkit-slider-thumb]:w-[26px] 
                         [&::-webkit-slider-thumb]:rounded-full 
                         [&::-webkit-slider-thumb]:bg-cyan-400 
                         [&::-webkit-slider-thumb]:cursor-pointer 
                         [&::-webkit-slider-thumb]:border-[3px] 
                         [&::-webkit-slider-thumb]:border-white 
                         [&::-webkit-slider-thumb]:shadow-lg 
                         [&::-webkit-slider-thumb]:transition-all 
                         [&::-webkit-slider-thumb]:duration-200 
                         [&::-webkit-slider-thumb]:ease-in-out
                         [&::-webkit-slider-thumb]:hover:bg-cyan-600 
                         [&::-webkit-slider-thumb]:hover:scale-110 
                         [&::-webkit-slider-thumb]:hover:shadow-xl
                         [&::-moz-range-thumb]:h-[26px] 
                         [&::-moz-range-thumb]:w-[26px] 
                         [&::-moz-range-thumb]:rounded-full 
                         [&::-moz-range-thumb]:bg-cyan-400 
                         [&::-moz-range-thumb]:cursor-pointer 
                         [&::-moz-range-thumb]:border-[3px] 
                         [&::-moz-range-thumb]:border-white 
                         [&::-moz-range-thumb]:shadow-lg 
                         [&::-moz-range-thumb]:transition-all 
                         [&::-moz-range-thumb]:duration-200 
                         [&::-moz-range-thumb]:ease-in-out
                         [&::-moz-range-thumb]:hover:bg-cyan-600 
                         [&::-moz-range-thumb]:hover:scale-110 
                         [&::-moz-range-thumb]:hover:shadow-xl"
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((salaryValue - 65000) / (90000 - 65000)) * 100}%, #374151 ${((salaryValue - 65000) / (90000 - 65000)) * 100}%, #374151 100%)`
                }}
              />
            </div>
          </div>
          
          {/* Salary Labels */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-[8.5rem] sm:shrink-0"></div>
            <div className="flex justify-between text-sm text-slate-400 flex-1 w-full sm:max-w-2xl">
              <span className="font-medium">$65K</span>
              <span className="font-medium">$80K</span>
              <span className="font-medium">$90K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="mt-6">
        <p className="leading-relaxedtext-blue-800 dark:text-blue-200 not-prose">
          You said: {hasInteracted &&(<span className="font-bold">${formatSalary(salaryValue)}/year</span>)}
        </p>
        {hasInteracted && (
          <p className="leading-relaxedtext-blue-800 dark:text-blue-200 not-prose">{feedback}</p>
        )}
        {/* TODO: Make it blured and only visible when user clicks hovers*/}
        {hasInteracted && (
          <p className="leading-relaxedtext-blue-800 dark:text-blue-200 not-prose mt-2">Company's budget for the role was $70K - $80K.</p>
        )}
      </div>
    </div>
  );
}
