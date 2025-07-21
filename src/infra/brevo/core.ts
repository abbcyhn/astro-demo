import { ContactsApi } from "@getbrevo/brevo";

let contactAPI = new ContactsApi();
(contactAPI as any).authentications.apiKey.apiKey = process.env.BREVO_API_KEY || '';

export default contactAPI;