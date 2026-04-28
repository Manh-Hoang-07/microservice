export const CONTACT_SUBMITTED_TOPIC = 'contact.submitted';

export interface ContactSubmittedEvent {
  contact_id: string;
  name: string;
  email: string;
  subject: string;
  submitted_at: string;
}
