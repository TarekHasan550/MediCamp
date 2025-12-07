import { OrganizerRegistrationsResponse, RegisteredCamp } from '@/types';

export const transformToRegisteredCamps = (
  response: OrganizerRegistrationsResponse
): RegisteredCamp[] => {
  return response.data.flatMap((camp, campIndex) =>
    camp.registrations.map((reg, regIndex) => ({
      id: campIndex * 1000 + regIndex + 1, // unique id
      campName: camp.name,
      campFees: camp.fees,
      participantName: reg.participant.name,
      participantEmail: reg.participant.email,
      participantPhone: reg.phone,
      age: reg.age,
      gender: reg.gender,
      emergencyContact: reg.emergencyContact,
      paymentStatus: reg.paymentStatus,
      confirmationStatus: reg.confirmationStatus,
      registrationDate: reg.createdAt,
      registrationId: reg._id,
    }))
  );
};
