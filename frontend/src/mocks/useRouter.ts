export const useRouter = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return jest.spyOn(require('next/router'), 'useRouter');
  };

/**
 * Used for mocking next router in jest test
 * @param pathname - router path default should set "/"
 */
export function mockNextUseRouter(pathname: string) {
  useRouter().mockImplementation(() => ({
    route: '',
    basePath: '',
    pathname,
    query: {},
    asPath: '',
    push: async () => true,
    replace: async () => true,
    reload: () => null,
    back: () => null,
    prefetch: async () => undefined,
    beforePopState: () => null,
    isFallback: false,
    events: {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
  }));
}