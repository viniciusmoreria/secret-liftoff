import React from 'react';

import { Logger } from '@libs/logger';

import { Fallback } from './fallback';

const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) =>
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

export interface ErrorBoundaryProps {
  onResetKeysChange?: (
    prevResetKeys: Array<unknown> | undefined,
    resetKeys: Array<unknown> | undefined
  ) => void;
  onReset?: (...args: Array<unknown>) => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
  resetKeys?: Array<unknown>;
  renderFallback?: (props: FallbackProps) => React.ReactNode;
  disableCaptureException?: boolean;
}

type ErrorBoundaryState = { error: Error | null };

const initialState: ErrorBoundaryState = { error: null };

export class ErrorBoundary extends React.Component<
  React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { error } = this.state;
    const { resetKeys, onResetKeysChange } = this.props;

    if (
      error !== null &&
      prevState.error !== null &&
      changedArray(prevProps.resetKeys, resetKeys)
    ) {
      onResetKeysChange?.(prevProps.resetKeys, resetKeys);
      this.reset();
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const { onError, disableCaptureException } = this.props;

    if (!disableCaptureException) {
      Logger.error(error);
    }
    onError?.(error, info);
  }

  resetErrorBoundary = (...args: Array<unknown>) => {
    const { onReset } = this.props;
    onReset?.(...args);
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  render() {
    const { error } = this.state;
    const { renderFallback, children } = this.props;

    if (error !== null) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (renderFallback) {
        return renderFallback?.(props);
      }
      return <Fallback {...props} />;
    }

    return children;
  }
}
