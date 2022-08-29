// eslint-disable-next-line @typescript-eslint/ban-types
export interface FetchBody<T = {}> {
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<FormData>;
  json(): Promise<T>;
  text(): Promise<string>;
}

export interface FetchResponse<T> extends FetchBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  // eslint-disable-next-line no-shadow
  clone<T>(): FetchResponse<T>;
}

export type Fetch = <T = any>(
  input: RequestInfo,
  init?: RequestInit
) => Promise<FetchResponse<T>>;

declare global {
  function fetch<T = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<FetchResponse<T>>;
}
