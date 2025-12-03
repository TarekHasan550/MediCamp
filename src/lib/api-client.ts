type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export async function fetchAPI<T = any>(
  input: string,
  options: FetchOptions = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${input}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',

        ...options.headers,
      },

      cache: options.cache ?? 'no-store',
      ...options.next,
    });

    if (!res.ok) {
      const errorText = await res.text();
      let message = 'Something went wrong';

      try {
        const errorJson = JSON.parse(errorText);
        message = errorJson.message || errorJson.error || message;
      } catch {
        message = errorText || message;
      }

      return { data: null, error: message };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'Network error' };
  }
}
