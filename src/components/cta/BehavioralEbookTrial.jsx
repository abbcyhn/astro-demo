import { useState } from 'react';
import { handleEmailClick } from '../../scripts/email';

export default function BehavioralEbookTrial() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = async (e) => {
        await handleEmailClick(e, email, 'behavioral_ebook_trial', status, setStatus, setErrorMessage);
    };

    const getInputClass = () => {
        let classNames = 'w-full px-4 py-3 rounded-xl bg-white border-2 text-amber-900 focus:outline-none focus:ring-1 transition-all duration-200 shadow-md font-medium';
        if (status === 'idle') {
            classNames += ' placeholder-yellow-500 border-yellow-500 hover:border-yellow-600';
        }
        if (status === 'error') {
            classNames += ' border-red-500 text-red-500 placeholder-red-500';
        }
        if (status === 'success') {
            classNames += ' disabled:text-green-500';
        }
        return classNames;
    };

    const getButtonClass = () => {
        let classNames = 'w-full px-8 py-3 bg-gradient-to-r text-white font-bold rounded-xl';
        if (status === 'idle' || status === 'error') {
            classNames += ' from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 focus:outline-none transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer';
        }
        else if (status === 'loading') {
            classNames += ' from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 focus:outline-none cursor-not-allowed';
        }
        else if (status === 'success') {
            classNames += ' bg-green-500 cursor-not-allowed';
        }
        return classNames;
    };

    const getButtonContent = () => {
        let content = "GET YOUR FREE COPY NOW";
        if (status === 'loading') {
            content =                                     
                <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                </div>
        } else if (status === 'success') {
            content = 
                <div className="flex items-center justify-center gap-2">
                    <span>Check your inbox for the FREE copy!</span>
                </div>
        }
        return content;
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
                                onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
                                placeholder="Enter your email address"
                                disabled={status === 'loading' || status === 'success'}
                                className={getInputClass()}
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
                                disabled={status === 'loading' || status === 'success'}
                                className={getButtonClass()}>
                                {getButtonContent()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 