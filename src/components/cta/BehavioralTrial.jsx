import { useState } from 'react';

export default function BehavioralTrial() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const executeAction = async () => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        })
    };

    const handleClick = async () => {

        if (!email.trim()) {
            setStatus('error');
            setErrorMessage('Please enter your email address');
            return;
        }

        if (!isValidEmail(email.trim())) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (status === 'idle' || status === 'error') {
            setErrorMessage('');
            setStatus('loading');
            try {
                await executeAction();
                setStatus('success');
                setEmail('');
            } catch (error) {
                setStatus('error');
                setErrorMessage('Something went wrong. Please try again.');
                // TODO: Add error tracking
                // console.error('Action failed:', error);
            }
        }
    };

    return (
        <div className="p-8 rounded-xl my-8 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 dark:from-yellow-900/20 dark:to-amber-900/20 dark:border-yellow-400/30 shadow-lg ">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="flex-shrink-0">
                    <img 
                        src="/src/assets/images/ebook_behavioral_trial.png" 
                        alt="10 Most Common Interview Questions" 
                        className="w-80 h-100 object-cover rounded-lg shadow-lg"
                    />
                </div>
                
                {/* Content Section */}
                <div className="flex-1">

                    {/* Title */}
                    <div className="mb-4 not-prose">
                        <h3 className="text-3xl font-bold text-yellow-600 mb-4">No matter where you're interviewing</h3>
                    </div>

                    {/* Content */}
                    <div className="text-gray-700 dark:text-gray-300 mb-6 space-y-4">
                        <p>FAANG, startups or anything in between</p>
                        <p>These <strong><i><ins>10 INTERVIEW QUESTIONS</ins></i></strong> keep coming up.</p>
                        <p>Learn how to answer each one <strong><i><ins>LIKE A PRO !</ins></i></strong> </p>
                    </div>
                    
                    {/* CTA Button */}
                    <div>
                        {status === 'success' ? (
                            <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 shadow-md">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl font-semibold">✓</span>
                                </div>
                                <span className="text-amber-800 font-semibold text-lg">Successfully subscribed!</span>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setStatus('idle');
                                            setErrorMessage('');
                                        }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                                        placeholder="Enter your email address"
                                        className={`w-full px-4 py-3 rounded-xl bg-white border-2 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-1 transition-all duration-200 shadow-md font-medium ${
                                        status === 'error' 
                                            ? 'border-red-500 text-red-500 placeholder-red-500' 
                                            : 'border-amber-200 focus:border-amber-400 focus:ring-amber-100'
                                        }`}
                                    />
                                    {errorMessage && (
                                        <p className="text-red-500 text-sm font-medium ml-2 not-prose">
                                            {errorMessage}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleClick}
                                        className={`w-full px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-yellow-700 focus:outline-none transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${(status === 'idle' || status === 'error') ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                        >
                                        {status === 'loading' ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Loading...</span>
                                            </div>
                                        ) : (
                                            "GET YOUR FREE COPY NOW"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 