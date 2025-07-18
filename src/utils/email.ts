import React from 'react';


/**
 * Handle email form submission
 * @param e - The event object
 * @param email - The email to validate
 * @param status - The current status of the form
 * @param setStatus - Function to update the status
 * @param setErrorMessage - Function to update the error message
 * @param executeEmailAction - Function to execute the email action
 * @param onSuccess - Optional callback to run after successful submission
 */
export const handleEmailClick = async (
    e: React.MouseEvent<HTMLButtonElement>, 
    email: string, 
    status: EmailFormStatus, 
    setStatus: (status: EmailFormStatus) => void, 
    setErrorMessage: (errorMessage: string) => void, 
    executeEmailAction: () => Promise<void>,
    onSuccess?: () => void
  ) => {
      e.preventDefault();
  
      if (status !== 'idle' && status !== 'error') {
          return;
      }
  
      const validation = validateEmailInput(email);
      if (!validation.isValid) {
        setStatus('error');
        setErrorMessage(validation.errorMessage);
        return;
      }
  
      setErrorMessage('');
      setStatus('loading');
      try {
          await executeEmailAction();
          setStatus('success');
          if (onSuccess) {
              onSuccess();
          }
      } catch (error) {
          setStatus('error');
          setErrorMessage('Something went wrong. Please try again.');
          // TODO: Add error tracking
          // console.error('Action failed:', error);
      }
};


/**
 * Common email form state type
 */
type EmailFormStatus = 'idle' | 'loading' | 'success' | 'error';


/**
 * Email validation utility
 * @param email - The email string to validate
 * @returns boolean indicating if email is valid
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validation helper for email forms
 * @param email - The email to validate
 * @returns Object with isValid flag and error message
 */
const validateEmailInput = (email: string): { isValid: boolean; errorMessage: string } => {
  if (!email.trim()) {
    return {
      isValid: false,
      errorMessage: 'Please enter your email address'
    };
  }

  if (!isValidEmail(email.trim())) {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid email address'
    };
  }

  return {
    isValid: true,
    errorMessage: ''
  };
}; 