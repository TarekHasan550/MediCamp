import { getProfile } from './_action';
import ParticipantProfile from './_components/profile';

interface UserId {
  createdAt: string;
}

interface User {
  age: number;
  emergency_contact: string;
  phone_number: string;
  registered_camps: string[];
  userId: { createdAt: string };
}
export default async function page() {
  const { data, error } = await getProfile();

  if (error) {
    console.log(error);
    return null;
  }
  return <ParticipantProfile data={data.data.user as User | null} />;
}
