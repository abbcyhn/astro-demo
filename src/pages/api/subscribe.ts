export const prerender = false;

import type { APIRoute } from 'astro';
import connectToDB from '../../infra/db/mongo';
import EmailModel from '../../infra/db/models/email_model';

interface SubscribeRequest {
  email: string;
  source: string;
}

interface SuccessResponse {
  success: true;
  message: string;
  data: {
    email: string;
  };
}

interface ErrorResponse {
  success: false;
  message: string;
}

export const POST: APIRoute = async ({ request }) => {

    let subscribeRequest = await parseJsonRequest(request);

    let response = validateRequest(subscribeRequest);
    if (response) {
        return response;
    }

    try {
        await connectToDB();
        response = await processRequest(subscribeRequest);
    } catch (error: any) {
        response = handleError(error);
    }

    return response;
};

const parseJsonRequest = async (request: Request): Promise<SubscribeRequest> => {
    try {
        const { email, source }: SubscribeRequest = await request.json();
        return { email, source } as SubscribeRequest;
    } catch (error) {
        return { email: '', source: '' } as SubscribeRequest;
    }
};

const validateRequest = (subscribeRequest: SubscribeRequest): Response | null => {
    let errorResponse: ErrorResponse | null = null;
    let email: string = subscribeRequest.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email presence
    if (email === '') {
        errorResponse = {
            success: false,
            message: 'Email is required'
        };
    } 
    // Validate email format
    else if (!emailRegex.test(email)) {
        errorResponse = {
            success: false,
            message: 'Invalid email format'
        };
    }

    if (errorResponse === null) {
        return null;
    }

    return new Response(JSON.stringify(errorResponse), {
        status: 400,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const processRequest = async (subscribeRequest: SubscribeRequest): Promise<Response> => {
    let response = await isAlreadySaved(subscribeRequest);
    if (response) {
        return response;
    }

    response = await saveRequest(subscribeRequest);
    await sendEmail(subscribeRequest);
    return response;
}

const isAlreadySaved = async (subscribeRequest: SubscribeRequest): Promise<Response | null> => {
    let email: string = subscribeRequest.email;

    const emailModel = await EmailModel.findOne({ email });
    if (emailModel) {
        const successResponse: SuccessResponse = {
            success: true,
            message: 'Email is already subscribed',
            data: {
                email: email,
            }
        };

        return new Response(JSON.stringify(successResponse), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return null;
};

const saveRequest = async (subscribeRequest: SubscribeRequest): Promise<Response> => {
    let email: string = subscribeRequest.email;
    let source: string = subscribeRequest.source;

    const emailModel = new EmailModel({ email, source });
    await emailModel.save();

    const successResponse: SuccessResponse = {
        success: true,
        message: 'Successfully subscribed to newsletter!',
        data: {
            email: email,
        }
    };

    return new Response(JSON.stringify(successResponse), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const sendEmail = async (subscribeRequest: SubscribeRequest): Promise<void> => {
    // TODO: Send email to user
};

const handleError = (error: any): Response => {
    let response: Response;

    // Handle validation errors
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        const errorResponse: ErrorResponse = {
            success: false,
            message: messages.join(', ')
        };
        
        response = new Response(JSON.stringify(errorResponse), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        // Handle other errors
        const errorResponse: ErrorResponse = {
            success: false,
            message: 'Internal server error'
        };
        
        response = new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return response;
};