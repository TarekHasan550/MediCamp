'use server';

import { fetchAPI } from '@/lib/api-client';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const joinUs = async (data: RegisterForm) => {
  if (data.password !== data.confirmPassword) {
    return { data: null, error: 'Passwords do not match' };
  }

  const { data: res, error } = await fetchAPI('/users/signup', {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  return {
    data: res,
    error,
  };
};
