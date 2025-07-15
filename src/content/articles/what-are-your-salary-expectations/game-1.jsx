import { useState, useEffect } from 'react';

export default function Game1AnswerWithNumber() {
  const [salaryValue, setSalaryValue] = useState(75000);
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackDetails, setFeedbackDetails] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  const minSalary = 65000
  const maxSalary = 90000
  const stepSalary = 500
  const actualRange = { min: 70000, max: 80000 };

  const updateFeedback = (value) => {
    if (value < actualRange.min) {
      setFeedbackTitle('You asked for too little!');
      setFeedbackDetails('Now, they might give you the number you said, but hire you as a junior or middle, not a senior. Or, if you did really well in the tech interview, they might still hire you as a senior but give you the lowest pay, in this case $70K/year.');
    } else if (value == actualRange.min) {
      setFeedbackTitle('You asked for the lowest number in their range.');
      setFeedbackDetails('The recruiter most likely will say ok. But you left at least $5K on the table.');
    } else if (value >= actualRange.min && value <= 75000) {
      setFeedbackTitle('You asked for mid number in their range.');
      setFeedbackDetails('So, the recruiter might offer you the lowest number to see what you say. If you not go lower, after couple of back and forth, they might say, “Let’s talk about it later.” That’s not a good way to start the interview.');
    } else if (value > 75000 && value <= actualRange.max) {
      setFeedbackTitle('You asked for the highest number in their range.');
      setFeedbackDetails('Unless you have strong references and are a rockstar engineer, they’ll wait to see how you do in the tech interview. If you do great in the first round, they might move forward. But if you don’t, they may skip you, because of other candidates who did better and asked for less money.');
    } else {
      setFeedbackTitle('You asked for too much!');
      setFeedbackDetails('If there’s no open higher position, they will probably skip you. Most companies won’t consider the candidates who ask for way more money than they plan to spend. Or, they might give you a test to see how good you are and keep you as a backup for future opportunities.');
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
                min={minSalary}
                max={maxSalary}
                step={stepSalary}
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
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((salaryValue - minSalary) / (maxSalary - minSalary)) * 100}%, #374151 ${((salaryValue - minSalary) / (maxSalary - minSalary)) * 100}%, #374151 100%)`
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
        {hasInteracted && (
          <div>
            <p className="leading-relaxedtext-blue-800 dark:text-blue-200 not-prose"><ins>You said:</ins> <span className="font-bold">${formatSalary(salaryValue)}/year</span></p>
            <p className="leading-relaxedtext-blue-800 dark:text-blue-200 not-prose"><ins>Company's budget:</ins> <span className="font-bold">$70K - $80K/year</span>.</p>
            <p className="leading-relaxedtext-blue-800 dark:text-blue-200 not-prose mt-5"><ins>Result:</ins>  <span className="font-bold">{feedbackTitle}</span></p>
            <p className="leading-relaxedtext-blue-800 dark:text-blue-200 not-prose">{feedbackDetails}</p>
          </div>
        )}
      </div>
    </div>
  );
}
