export interface RequestUtils<R> {
  getTokenFromRequest(req: R): string | null;
}

export type RequestError = {
  error: boolean;
  msg: string;
};
