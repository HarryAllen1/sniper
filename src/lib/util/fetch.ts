import { Dispatcher, request } from 'undici';

export async function fetch<T extends Record<string, unknown> | unknown>(
  input: string | URL,
  init?: { dispatcher?: Dispatcher } & Omit<
    Dispatcher.RequestOptions,
    'origin' | 'path' | 'method'
  > &
    Partial<Pick<Dispatcher.RequestOptions, 'method'>>
): Promise<T> {
  const { body } = await request(input, init);
  return body.json();
}
