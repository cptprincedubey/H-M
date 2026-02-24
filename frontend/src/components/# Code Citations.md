# Code Citations

## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: LGPL-3.0
https://github.com/Frikanalen/frikanalen/blob/b4c4e118974aac3116f24fffaafcb29fdcf65782/packages/frontend/modules/ui/icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: MIT
https://github.com/JamesJ0717/personal-site/blob/26b9b44d04a61a4d696508b133af5f18a0a9998f/src/components/layout.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: unknown
https://github.com/ckpd84/design/blob/392afb8035ae28e245cac1217cbb9e99e6692864/components/ui/icons/Mail.js

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: unknown
https://github.com/yoginderkumar/kiraya-web/blob/39a6d0778c8b6472a0e559c2a5cedb6aa80ec0d3/libs/kiraya-ui/src/lib/Icons.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900
```


## License: unknown
https://github.com/YeskinaAn/login-task/blob/991f6c36791318dcf06b4a7cb1faf77a6cb5d254/src/components/ForgotPassword.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative
```


## License: unknown
https://github.com/YeskinaAn/login-task/blob/991f6c36791318dcf06b4a7cb1faf77a6cb5d254/src/components/ForgotPassword.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative
```


## License: unknown
https://github.com/YeskinaAn/login-task/blob/991f6c36791318dcf06b4a7cb1faf77a6cb5d254/src/components/ForgotPassword.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative
```


## License: unknown
https://github.com/YeskinaAn/login-task/blob/991f6c36791318dcf06b4a7cb1faf77a6cb5d254/src/components/ForgotPassword.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative
```


## License: unknown
https://github.com/YeskinaAn/login-task/blob/991f6c36791318dcf06b4a7cb1faf77a6cb5d254/src/components/ForgotPassword.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative
```


## License: unknown
https://github.com/YeskinaAn/login-task/blob/991f6c36791318dcf06b4a7cb1faf77a6cb5d254/src/components/ForgotPassword.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative
```


## License: unknown
https://github.com/YeskinaAn/login-task/blob/991f6c36791318dcf06b4a7cb1faf77a6cb5d254/src/components/ForgotPassword.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative
```


## License: unknown
https://github.com/YeskinaAn/login-task/blob/991f6c36791318dcf06b4a7cb1faf77a6cb5d254/src/components/ForgotPassword.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative
```


## License: unknown
https://github.com/hmthanh/hmthanh.github.io/blob/98ecd05dd3b728186014265360423dab1d3af55d/src/components/LoadingPanel/LoadingPanel.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/tranlehaiquan/lucky-draw/blob/e7fc42c95a27d15ad7c3c81057b769c626f58701/src/components/Authenticate/Authenticate.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/chamilo/chamilo-lms/blob/03d95b9ccd98bd3a2c78825dbefe96876d00c8fd/assets/vue/views/Login.vue

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/hmthanh/hmthanh.github.io/blob/98ecd05dd3b728186014265360423dab1d3af55d/src/components/LoadingPanel/LoadingPanel.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/tranlehaiquan/lucky-draw/blob/e7fc42c95a27d15ad7c3c81057b769c626f58701/src/components/Authenticate/Authenticate.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/chamilo/chamilo-lms/blob/03d95b9ccd98bd3a2c78825dbefe96876d00c8fd/assets/vue/views/Login.vue

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/hmthanh/hmthanh.github.io/blob/98ecd05dd3b728186014265360423dab1d3af55d/src/components/LoadingPanel/LoadingPanel.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/tranlehaiquan/lucky-draw/blob/e7fc42c95a27d15ad7c3c81057b769c626f58701/src/components/Authenticate/Authenticate.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/chamilo/chamilo-lms/blob/03d95b9ccd98bd3a2c78825dbefe96876d00c8fd/assets/vue/views/Login.vue

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/hmthanh/hmthanh.github.io/blob/98ecd05dd3b728186014265360423dab1d3af55d/src/components/LoadingPanel/LoadingPanel.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/tranlehaiquan/lucky-draw/blob/e7fc42c95a27d15ad7c3c81057b769c626f58701/src/components/Authenticate/Authenticate.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/chamilo/chamilo-lms/blob/03d95b9ccd98bd3a2c78825dbefe96876d00c8fd/assets/vue/views/Login.vue

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/hmthanh/hmthanh.github.io/blob/98ecd05dd3b728186014265360423dab1d3af55d/src/components/LoadingPanel/LoadingPanel.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/tranlehaiquan/lucky-draw/blob/e7fc42c95a27d15ad7c3c81057b769c626f58701/src/components/Authenticate/Authenticate.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className
```


## License: unknown
https://github.com/chamilo/chamilo-lms/blob/03d95b9ccd98bd3a2c78825dbefe96876d00c8fd/assets/vue/views/Login.vue

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/chamilo/chamilo-lms/blob/03d95b9ccd98bd3a2c78825dbefe96876d00c8fd/assets/vue/views/Login.vue

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/hmthanh/hmthanh.github.io/blob/98ecd05dd3b728186014265360423dab1d3af55d/src/components/LoadingPanel/LoadingPanel.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/tranlehaiquan/lucky-draw/blob/e7fc42c95a27d15ad7c3c81057b769c626f58701/src/components/Authenticate/Authenticate.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/chamilo/chamilo-lms/blob/03d95b9ccd98bd3a2c78825dbefe96876d00c8fd/assets/vue/views/Login.vue

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/hmthanh/hmthanh.github.io/blob/98ecd05dd3b728186014265360423dab1d3af55d/src/components/LoadingPanel/LoadingPanel.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/tranlehaiquan/lucky-draw/blob/e7fc42c95a27d15ad7c3c81057b769c626f58701/src/components/Authenticate/Authenticate.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/chamilo/chamilo-lms/blob/03d95b9ccd98bd3a2c78825dbefe96876d00c8fd/assets/vue/views/Login.vue

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/hmthanh/hmthanh.github.io/blob/98ecd05dd3b728186014265360423dab1d3af55d/src/components/LoadingPanel/LoadingPanel.jsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/tranlehaiquan/lucky-draw/blob/e7fc42c95a27d15ad7c3c81057b769c626f58701/src/components/Authenticate/Authenticate.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```


## License: unknown
https://github.com/j-mcgregor/mdd-solutions-new/blob/219912b76b1ede3f8ab3ce9add0a596322d6993c/src/components/Form.tsx

```
I can see you're getting "internal server error" messages on the forgot password page. Let me analyze the issue and fix it.

The problem is likely in the [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx) component or the backend [`forgotPasswordController`](backend/src/controllers/auth.controller.js).

Let me check the backend controller first and fix the issues:

````javascript
// filepath: c:\Users\cptpr\H-M-Final\backend\src\controllers\auth.controller.js
// ...existing code...

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link - Use FRONTEND_URL from env or default
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
      return res.status(200).json({
        status: true,
        message: "Reset password link has been sent to your email. Please check your inbox.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset password email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ...existing code...
````

Now fix the frontend [`ForgotPassword.jsx`](frontend/src/pages/ForgotPassword.jsx):

````jsx
// filepath: c:\Users\cptpr\H-M-Final\frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/forgot-password", { email });
      
      if (res.data.status || res.data.message) {
        toast.success(res.data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email address");
      } else if (error.code === "ERR_NETWORK" || !error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send reset link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              
```

