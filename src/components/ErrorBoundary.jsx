import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorTest from "../pages/ErrorBoundary";
import Loader from "./Loader";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in boundary:", error, errorInfo);
  }

  resetErrorBoundary = () => {

    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <React.Suspense fallback={<Loader />}>
          <ErrorTest />
        </React.Suspense>
      );
    }

    return this.props.children;
  }
}



export default ErrorBoundary;
