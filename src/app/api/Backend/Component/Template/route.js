export const Verification_email = `
<html>
  <head>
    <style type="text/css">
      body {
        font-family: 'Poppins', Arial, sans-serif;
        font-size: 14px;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #f3f3f3;
      }
      .email-container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      .header {
        font-size: 22px;
        font-weight: bold;
        color: #222;
        margin-bottom: 20px;
      }
      .sub-header {
        font-size: 16px;
        font-weight: 500;
        color: #555;
        margin-bottom: 15px;
      }
      .verification-code {
        font-size: 28px;
        font-weight: bold;
        color: #e63946;
        margin: 20px 0;
      }
      .message {
        font-size: 15px;
        line-height: 1.8;
        color: #444;
        margin-bottom: 20px;
      }
      .cta-button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 25px;
        background-color: #e63946;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }
      .cta-button:hover {
        background-color: #d62839;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #888;
      }
      a {
        color: #e63946;
        text-decoration: none;
      }
    </style>
    <title>Email Verification</title>
  </head>
  <body>
    <div class="email-container">
  <p class="header">Welcome to Split Bills!</p>
  <p class="sub-header">Your journey towards simplified shared rides and payments begins here.</p>
  <p class="message">
    To complete your registration and start managing your rides and payments with ease, please verify your email address using the code below.
  </p>
  <p class="verification-code">{verificationCode}</p>
  <p class="message">
    Simply enter this code in the verification field on our website or app to get started. If you didn’t request this, please disregard this email or contact our support team.
  </p>
  <a href="#" class="cta-button">Verify My Email</a>
  <div class="footer">
    <p>&copy; 2024 Split Bills. Simplify your shared rides, simplify your life.</p>
      </div>
    </div>
  </body>
</html>
`;