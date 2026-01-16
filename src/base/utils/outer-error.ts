// https://stackoverflow.com/a/73719189
export class OuterError extends Error {
  innerError: Error | undefined;

  // biome-ignore lint/suspicious/noExplicitAny: When catching an error it is not typed Error by default. Allow any to aleviate this
  constructor(message?: string, innerError?: any) {
    super(message);
    this.innerError = innerError;
  }
}
