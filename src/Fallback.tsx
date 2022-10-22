import { FallbackProps } from "react-error-boundary";

export const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const retry = () => {
    resetErrorBoundary();
  };
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button type="button" onClick={retry}>
        Try again
      </button>
    </div>
  );
};
