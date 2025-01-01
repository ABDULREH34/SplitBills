import React from 'react'
import ContactForm from '@app/components/ContactAll/ContactForm/ContactForm'

const page = () => {
  return (
    <div className="w-full bg-black text-white">
      {/* Header Section with Black Background */}
      <div className="p-4 bg-black text-center">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg">We’re here to help! Whether you have a question, feedback, or need assistance, feel free to reach out to us.</p>
      </div>

      {/* How Can We Help Section */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold">How Can We Help?</h2>
        <ul className="mt-2 list-disc pl-5">
          <li><strong>General Support:</strong> If you need help with any functionality, we’re here to assist you!</li>
          <li><strong>Billing Queries:</strong> Have any questions about your recent bill splits or payments? We’re happy to clarify.</li>
          <li><strong>Suggestions & Feedback:</strong> Your feedback is valuable to us! If you have suggestions to make Split Bills even better, let us know!</li>
          <li><strong>Business Inquiries:</strong> Interested in collaborating or partnering? Reach out and let’s discuss.</li>
          <li><strong>Get In Touch:</strong>We’d love to hear from you. Fill out the contact form below and we'll get back to you as soon as possible.</li>
        </ul>
      </div>

      {/* Contact Form Section with White Background */}
    
      <div className="p-4 bg-white text-black">
        <ContactForm />
      </div>

      {/* Other Ways to Reach Us Section */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold">Other Ways to Reach Us</h3>
        <p className="mt-2">If you'd rather not use the contact form, feel free to email us directly at:</p>
        <p className="mt-2 text-black">
          <strong>Email:</strong> support@splitbills.com
        </p>
        <p className="mt-1 text-black">
          <strong>Phone:</strong> +123 456 7890 (If applicable)
        </p>
      </div>

      {/* Social Media Links */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold">Follow Us</h3>
        <p className="mt-2">Stay connected with Split Bills on social media:</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="#" className="text-white hover:text-gray-400">Facebook</a>
          <a href="#" className="text-white hover:text-gray-400">Twitter</a>
          <a href="#" className="text-white hover:text-gray-400">Instagram</a>
        </div>
      </div>
    </div>
  )
}

export default page
