const resetPassTemplate = (username, resetlink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #000;
                margin: 0;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                margin-bottom: 30px;
            }
            .button {
                display: inline-block;
                background-color: #000;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 30px;
                border-radius: 5px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>H&M Password Reset</h1>
            </div>

            <div class="content">
                <p>Hello ${username},</p>

                <p>You have requested to reset your password for your H&M account. Click the button below to reset your password:</p>

                <div style="text-align: center;">
                    <a href="${resetlink}" class="button">Reset Password</a>
                </div>

                <div class="warning">
                    <strong>Important:</strong> This link will expire in 2 minutes for security reasons. If you didn't request this password reset, please ignore this email.
                </div>

                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">${resetlink}</p>

                <p>For security reasons, this link can only be used once and will expire shortly.</p>

                <p>If you have any questions, please contact our support team.</p>

                <p>Best regards,<br>The H&M Team</p>
            </div>

            <div class="footer">
                <p>This email was sent to you because you requested a password reset for your H&M account.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <p>&copy; 2024 H&M. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = resetPassTemplate;
