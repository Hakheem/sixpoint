import { Resend } from 'resend';
import { resetPasswordTemplate } from './email-templates/reset-password';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
  sendPasswordReset: async (email: string, userName: string, resetToken: string): Promise<boolean> => {
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
      const html = resetPasswordTemplate(userName || 'Guest', resetUrl);
      
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Sixpoint Victoria <noreply@sixpointvictoria.com>',
        to: email,
        subject: 'Reset Your Password - Sixpoint Victoria',
        html: html,
      });

      if (error) {
        console.error('Error sending password reset email:', error);
        return false;
      }

      console.log('Password reset email sent successfully:', data?.id);
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }
};

