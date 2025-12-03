export const resetPasswordTemplate = (userName: string, resetUrl: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Sixpoint Victoria</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.6;
        color: #1a202c;
        background-color: #f7fafc;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
      }
      
      .header {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 40px 30px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      
      .hotel-name {
        font-size: 28px;
        font-weight: 600;
        color: #1a202c;
        margin: 0;
        font-family: 'Georgia', serif;
      }
      
      .content {
        padding: 40px 30px;
        border: 1px solid #e2e8f0;
        border-top: none;
        border-bottom: none;
      }
      
      .greeting {
        font-size: 18px;
        color: #2d3748;
        margin-bottom: 20px;
      }
      
      .message {
        color: #4a5568;
        margin-bottom: 24px;
        font-size: 16px;
      }
      
      .button-container {
        text-align: center;
        margin: 32px 0;
      }
      
      .reset-button {
        display: inline-block;
        padding: 14px 32px;
        background: #FFD700;
        color: #1a202c;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 16px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .reset-button:hover {
        background: #C8A903;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
      }
      
      .url-container {
        background: #f7fafc;
        padding: 16px;
        border-radius: 6px;
        margin: 24px 0;
        border: 1px solid #e2e8f0;
      }
      
      .url-text {
        font-size: 14px;
        color: #4a5568;
        word-break: break-all;
      }
      
      .url-link {
        color: #3182ce;
        text-decoration: none;
      }
      
      .warning {
        color: #e53e3e;
        font-size: 14px;
        margin: 16px 0;
      }
      
      .footer {
        background: #1a202c;
        color: #cbd5e0;
        padding: 30px;
        text-align: center;
        border-radius: 0 0 8px 8px;
      }
      
      .footer-text {
        font-size: 14px;
        margin-bottom: 8px;
      }
      
      .security-note {
        font-size: 12px;
        color: #a0aec0;
        margin-top: 16px;
      }
      
      @media (max-width: 600px) {
        .container {
          margin: 0 16px;
        }
        
        .header {
          padding: 30px 20px;
        }
        
        .content {
          padding: 30px 20px;
        }
        
        .hotel-name {
          font-size: 24px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="hotel-name">🏨 Sixpoint Victoria</h1>
      </div>
      
      <div class="content">
        <h2 style="color: #1a202c; margin-bottom: 24px; font-size: 24px;">Reset Your Password</h2>
        
        <p class="greeting">Hello ${userName || 'there'},</p>
        
        <p class="message">
          We received a request to reset your password for your Sixpoint Victoria guest account. 
          Click the button below to create a new password:
        </p>
        
        <div class="button-container">
          <a href="${resetUrl}" class="reset-button">Reset Password</a>
        </div>
        
        <div class="url-container">
          <p class="url-text" style="margin-bottom: 8px;">
            Or copy and paste this link into your browser:
          </p>
          <a href="${resetUrl}" class="url-link">${resetUrl}</a>
        </div>
        
        <p class="warning">
          ⚠️ This link will expire in 1 hour for security reasons.
        </p>
        
        <p class="message" style="color: #718096;">
          If you didn't request a password reset, you can safely ignore this email. 
          Your account remains secure.
        </p>
      </div>
      
      <div class="footer">
        <p class="footer-text">© 2024 Sixpoint Victoria Hotel. All rights reserved.</p>
        <p class="footer-text">Kisumu, Kenya</p>
        <p class="security-note">🔒 This is an automated message. Please do not reply.</p>
      </div>
    </div>
  </body>
</html>
`;
