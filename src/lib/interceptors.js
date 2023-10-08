// components/GlobalErrorHandler.js
import Modal from "@/components/global/Modal";
import React, { Component } from "react";

class GlobalErrorHandler extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    // Check if the error is due to a 401 or 403 response
    if (
      errorInfo.componentStack.includes("HTTPError: 401") ||
      errorInfo.componentStack.includes("HTTPError: 403")
    ) {
      // Show the modal
      this.setState({ hasError: true });

      // Redirect to the login page after a delay
      setTimeout(() => {
        window.location.href = "/auth/login"; // Change '/login' to your actual login page route
      }, 10000); // Adjust the delay as needed
    }
  }

  render() {
    if (this.state.hasError) {
      // Render your modal here
      return (
        <Modal>
          <h1>Not Authorised</h1>
        </Modal>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorHandler;
