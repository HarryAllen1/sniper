import {
  fetch as undiciFetch,
  RequestInfo,
  RequestInit,
  BodyMixin,
  ControlledAsyncIterable,
  FormData,
  ResponseRedirectStatus,
  Headers,
  BodyInit,
  ResponseInit,
  ResponseType,
} from 'undici';

export function fetch<T extends Record<string, unknown> | unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response<T>> {
  return <any>undiciFetch(input, init);
}
export declare class Response<
  T extends Record<string, unknown> | unknown = unknown
> implements BodyMixin
{
  constructor(body?: BodyInit, init?: ResponseInit);

  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  readonly redirected: boolean;

  readonly body: ControlledAsyncIterable | null;
  readonly bodyUsed: boolean;

  readonly arrayBuffer: () => Promise<ArrayBuffer>;
  readonly blob: () => Promise<import('buffer').Blob>;
  readonly formData: () => Promise<FormData>;
  readonly json: () => Promise<T>;
  readonly text: () => Promise<string>;

  readonly clone: () => Response<T>;

  static error(): Response;
  static redirect(url: string | URL, status: ResponseRedirectStatus): Response;
}
