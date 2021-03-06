import React from "react";

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  public render() {
    if (this.state.hasError) {
      // TODO: render error banner
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
