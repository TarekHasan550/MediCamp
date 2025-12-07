export interface Participant {
  _id: string;
  name: string;
  email: string;
  age: number;
}

// একটা রেজিস্ট্রেশনের পুরো ডাটা
export interface RegistrationDetail {
  _id: string;
  participant: Participant;
  age: number;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  emergencyContact: string;
  paymentStatus: 'paid' | 'unpaid';
  confirmationStatus: 'pending' | 'confirmed';
  createdAt: string; // ISO string
}

export interface CampWithRegistrations {
  _id: string;
  name: string;
  image: string;
  fees: number;
  description: string;
  dateTime: string; // ISO date
  location: string;
  professional: string;
  participantCount: number;
  organizer: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  registrations: RegistrationDetail[];
}

export interface OrganizerRegistrationsResponse {
  success: true;
  data: CampWithRegistrations[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface RegisteredCamp {
  id: number;
  campName: string;
  campFees: number;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  age: number;
  gender: string;
  emergencyContact: string;
  paymentStatus: 'paid' | 'unpaid';
  confirmationStatus: 'pending' | 'confirmed';
  registrationDate: string;
  registrationId: string;
}
