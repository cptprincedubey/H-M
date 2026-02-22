# Password Recovery System - Flow Diagrams

## 1. Forgot Password Flow

```
┌─────────────────┐
│  User at Login  │
└────────┬────────┘
         │
         ▼
┌──────────────────────────┐
│ Clicks "Forgot Password" │
└────────┬─────────────────┘
         │
         ▼
  ┌────────────────────┐
  │  Forgot Password   │
  │      Page          │
  │ (Input: Email)     │
  └────────┬───────────┘
           │
           ▼
   ┌──────────────────┐
   │  User enters     │
   │  registered      │
   │  email & clicks  │
   │  "Send Link"     │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────────────┐
   │  Backend:                │
   │  - Finds user            │
   │  - Generates JWT token   │
   │  - Saves to DB           │
   │  - Sends email           │
   └────────┬─────────────────┘
            │
            ▼
  ┌──────────────────────┐
  │  User receives       │
  │  email with link:    │
  │  /reset-password     │
  │  /:token             │
  └────────┬─────────────┘
           │
           ▼
     ┌──────────────────┐
     │  User clicks     │
     │  link in email   │
     └────────┬─────────┘
              │
              ▼
       [Redirect to Reset Page]
```

## 2. Reset Password Flow

```
┌──────────────────────────────┐
│  Reset Password Page         │
│  (Token from URL)            │
│  Input: Password + Confirm   │
└────────┬─────────────────────┘
         │
         ▼
  ┌──────────────────────┐
  │  User enters new     │
  │  password (min 6     │
  │  chars) and          │
  │  clicks "Reset"      │
  └────────┬─────────────┘
           │
           ▼
 ┌─────────────────────────┐
 │  Frontend validates:    │
 │  - Password length ≥ 6  │
 │  - Passwords match      │
 └────────┬────────────────┘
          │
          ▼
 ┌──────────────────────────┐
 │  Backend validates:      │
 │  - Token not expired     │
 │  - Token matches DB      │
 │  - User exists           │
 └────────┬─────────────────┘
          │
          ▼
  ┌───────────────────────┐
  │  Password hashed      │
  │  & saved to DB        │
  │  Token cleared        │
  │  Confirmation email   │
  │  sent to user         │
  └────────┬──────────────┘
           │
           ▼
  ┌─────────────────────┐
  │  Success Message    │
  │  Redirect to Login  │
  └─────────────────────┘
           │
           ▼
  ┌──────────────────────┐
  │  User logs in with   │
  │  new password        │
  └──────────────────────┘
```

## 3. Update Password Flow (Logged-in User)

```
┌──────────────────────┐
│  Logged-in User      │
│  Header Account Menu │
└────────┬─────────────┘
         │
         ▼
┌────────────────────┐
│ Clicks "Change     │
│  Password"         │
└────────┬───────────┘
         │
         ▼
  ┌─────────────────────────┐
  │  Update Password Page   │
  │  (Requires Auth)        │
  │  Input:                 │
  │  - Current Password     │
  │  - New Password         │
  │  - Confirm Password     │
  └────────┬────────────────┘
           │
           ▼
  ┌──────────────────────────┐
  │  User enters all 3       │
  │  password fields         │
  │  Clicks "Update"         │
  └────────┬─────────────────┘
           │
           ▼
 ┌─────────────────────────┐
 │  Frontend validates:    │
 │  - Current ≠ New        │
 │  - New ≥ 6 chars        │
 │  - New = Confirm        │
 └────────┬────────────────┘
          │
          ▼
 ┌──────────────────────────┐
 │  Backend:                │
 │  - Verify current pwd    │
 │  - Hash new password     │
 │  - Update in DB          │
 │  - Send email            │
 └────────┬─────────────────┘
          │
          ▼
  ┌────────────────────┐
  │  Success Message   │
  │  Redirect to Home  │
  │  User logged in    │
  │  with new password │
  └────────────────────┘
```

## 4. State Management

### Frontend (React Context)
```
AuthContext
├── user: {_id, name, email, ...}
├── setUser: Function
└── Token stored in httpOnly cookie
```

### Backend (Database)
```
User Document
├── _id: ObjectId
├── name: String
├── email: String (unique)
├── password: String (hashed)
├── resetToken: String (null when not resetting)
├── resetTokenExpire: Date (null when not resetting)
├── favorites: Array
├── createdAt: Date
└── updatedAt: Date
```

## 5. API Request/Response Examples

### Forgot Password
```
REQUEST:
POST /api/auth/user/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

RESPONSE (200):
{
  "message": "Reset password link has been sent to your email"
}

RESPONSE (404):
{
  "message": "User not found with this email"
}
```

### Reset Password
```
REQUEST:
POST /api/auth/user/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "password": "newPassword123",
  "confirmPassword": "newPassword123"
}

RESPONSE (200):
{
  "message": "Password has been reset successfully. You can now login with your new password."
}

RESPONSE (400):
{
  "message": "Invalid or expired reset token. Please request a new one."
}
```

### Update Password
```
REQUEST:
POST /api/auth/user/update-password
Content-Type: application/json
Authorization: Bearer <auth_token>

{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456",
  "confirmPassword": "newPassword456",
  "userId": "user_object_id"
}

RESPONSE (200):
{
  "message": "Password has been updated successfully"
}

RESPONSE (400):
{
  "message": "Current password is incorrect"
}
```

## 6. Security Timeline

```
│ Action                          │ Time                    │
├─────────────────────────────────┼─────────────────────────┤
│ User clicks Forgot Password     │ T+0                     │
│ Token generated                 │ T+0, Expires T+2 min    │
│ Email sent                      │ T+0                     │
│ User opens email                │ T+30 sec (example)      │
│ User clicks reset link          │ T+1 min (example)       │
│ Token validated (OK)            │ T+1 min (token valid)   │
│ Password updated                │ T+1 min                 │
│ Token cleared from DB           │ T+1 min                 │
│ Another attempt at T+2.5 min    │ Token EXPIRED           │
│ Token expires in DB cleanup     │ T+2 min                 │
```

## 7. Error Handling Flow

```
┌──────────────────────┐
│  User Action         │
└────────┬─────────────┘
         │
         ▼
 ┌──────────────────┐
 │  API Request     │
 └────────┬─────────┘
          │
          ▼
 ┌─────────────────────┐
 │  Validation        │
 │  Errors?           │
 └──┬─────────────┬───┘
    │ YES         │ NO
    ▼             ▼
 ┌──────┐    ┌──────────────┐
 │Error │    │ Process      │
 │Toast │    │ Request      │
 │Show  │    └────┬─────────┘
 │to    │         │
 │User  │         ▼
 │      │    ┌──────────────┐
 │      │    │ DB Error?    │
 │      │    └──┬────────┬──┘
 │      │       │ YES    │ NO
 │      │       ▼        ▼
 │      │    ┌──────┐  ┌──────┐
 │      │    │Error │  │Success│
 │      │    │Toast │  │Toast  │
 │      └────┤      │  │Success│
 │           │      │  │Page   │
 └───────────┤      │  │       │
             └──────┘  └───────┘
```

## 8. Component Hierarchy

```
AppRouter
└── HomeLayout
    ├── Header
    │   └── Account Menu (dropdown)
    │       ├── Login Link
    │       ├── Register Link
    │       ├── User Info (if logged in)
    │       ├── Change Password Link
    │       └── Logout Button
    ├── SearchModal
    ├── Login Page
    │   └── "Forgot Password" Link
    ├── ForgotPassword Page
    │   └── Email Form
    ├── ResetPassword Page
    │   └── Password Reset Form
    ├── UpdatePassword Page
    │   └── Password Update Form
    ├── Register Page
    ├── HomePage
    ├── LadiesPage
    ├── MenPage
    ├── KidsPage
    ├── BeautyPage
    ├── CartPage
    ├── CheckoutPage
    ├── FavoritesPage
    └── NotFoundPage
```

## 9. Email Delivery Timeline

```
┌──────────────────────┐
│ User requests        │
│ password reset       │
└───────┬──────────────┘
        │
        ▼
┌──────────────────────┐
│ Backend generates    │ ← Application Logic
│ token & saves to DB  │
└───────┬──────────────┘
        │
        ▼
┌──────────────────────┐
│ Nodemailer creates   │ ← Email Service
│ HTML email with      │
│ reset link           │
└───────┬──────────────┘
        │
        ▼
┌──────────────────────┐
│ Gmail SMTP sends     │ ← Email Protocol
│ email to user        │
└───────┬──────────────┘
        │
        ▼
┌──────────────────────┐
│ Email arrives in     │ ← User's Inbox
│ user's mailbox       │
└───────┬──────────────┘
        │
        ▼
┌──────────────────────┐
│ User clicks link     │
│ within 2 minutes     │ ← Token Valid
└───────┬──────────────┘
        │
        ▼
[Reset Password Successful]
```

---

**Visual Guide Status**: ✅ Complete
**Last Updated**: February 22, 2026
