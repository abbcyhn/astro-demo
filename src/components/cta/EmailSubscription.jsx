import { useState } from 'react';
import { handleEmailClick } from '../../scripts/email';

export default function EmailSubscription() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = async (e) => {
        await handleEmailClick(e, email, 'email_subscription_form', status, setStatus, setErrorMessage);
    };

    const getParentClass = () => {
        let classNames = 'flex items-center rounded-lg bg-slate-800 border overflow-hidden';
        if (status === 'idle' || status === 'loading') {
            classNames += ' border-yellow-500 hover:border-yellow-600';
        }
        else if (status === 'success') {
            classNames += ' border-green-500 hover:border-green-600';
        }
        else if (status === 'error') {
            classNames += ' border-red-500 hover:border-red-600';
        }
        return classNames;
    };

    const getInputClass = () => {
        let classNames = 'bg-transparent text-text-secondary w-full px-4 py-3 focus:outline-none placeholder-slate-500';
        if (status === 'success') {
            classNames += ' disabled:text-green-500';
        }
        if (status === 'error') {
            classNames += ' text-red-400 placeholder-red-400';
        }
        return classNames;
    };

    const getButtonClass = () => {
        let classNames = 'group p-3 transition-colors';
        if (status === 'idle') {
            classNames += ' bg-yellow-500 hover:bg-yellow-600';
        } else if (status === 'loading') {
            classNames += ' bg-yellow-500 hover:bg-yellow-600 cursor-not-allowed';
        } else if (status === 'success') {
            classNames += ' bg-green-500 cursor-not-allowed';
        }
        else if (status === 'error') {
            classNames += ' bg-red-500 hover:bg-red-600';
        }
        return classNames;
    };

    const getButtonContent = () => {
        let content =             
            <svg className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12h16m-7-7 7 7-7 7"></path>
            </svg>;
        if (status === 'loading') {
            content = <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
        } else if (status === 'success') {
            content = 
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>;
        } 
        return content;
    };

    return (
        <div className="space-y-2">
            <div className={getParentClass()}>
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

            <button 
                type="button" 
                onClick={handleClick}
                disabled={status === 'loading' || status === 'success'}
                className={getButtonClass()}>
                {getButtonContent()}
            </button>
            </div>
            
            {errorMessage && (
            <p className="text-red-400 text-sm ml-2">
                {errorMessage}
            </p>
            )}
        </div>
    );
}