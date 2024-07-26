import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    const { isAuthenticated, signinRedirect, isLoading } = context.authentication;
    // eslint-disable-next-line no-console
    console.log(isAuthenticated, isLoading);

    if (!isLoading && !isAuthenticated) {
      signinRedirect();
    }
  },
})
