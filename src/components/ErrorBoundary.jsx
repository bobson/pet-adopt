import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, redirect: false };
  }

  // ************* ova ne **********************//
  // static getDerivedStateFromProps() {
  //   return { hasError: true };
  // }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // redirect - reach/router
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 5000);
  }

  // moze i vaka za redirect
  // componentDidUpdate() {
  //   if (this.state.error) {
  //     setTimeout(() => {
  //       this.setState({ redirect: true });
  //     }, 5000);
  //   }
  // }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.errorInfo) {
      return (
        <div className="details">
          <h1>
            There was an error with tis listing .<Link to="/">Click here </Link>{" "}
            to go back to the home page or wait five seconds
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
