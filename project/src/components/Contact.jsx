import React, { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, Globe } from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 8347394206", href: "tel:+918347394206" },
    { icon: Mail, label: "Email", value: "rauljiaditya54@gmail.com", href: "mailto:rauljiaditya54@gmail.com" },
    { icon: MapPin, label: "Location", value: "Gujarat, Ahmedabad", href: "#" },
    { icon: Globe, label: "Website", value: "www.CareSlotter.com", href: "https://CareSlotter.com" },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          form.current.reset();
          setIsLoading(false);
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          alert("❌ Failed to send message.");
          setIsLoading(false);
        }
      );
  };

  return (
    <section id="contact" className="py-12 md:py-16 flex justify-center items-start min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0,rgba(0,0,0,0)_50%)]" />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 glitch-text">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Let's discuss your project and see how we can work together to create something amazing.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">
          {/* Left Side: Form */}
          <div className="w-full md:w-1/2 max-w-[400px] mx-auto md:mx-0">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-green-500 text-center md:text-left">Send Me a Message</h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="user_name" className="block text-xs font-medium text-gray-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    className="w-full px-3 py-2 rounded bg-white/5 border border-green-500/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/50"
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className="block text-xs font-medium text-gray-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    className="w-full px-3 py-2 rounded bg-white/5 border border-green-500/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/50"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-gray-400 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 rounded bg-white/5 border border-green-500/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/50"
                  placeholder="Project Discussion"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 rounded bg-white/5 border border-green-500/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/50"
                  placeholder="Your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded bg-green-500/20 text-green-500 border border-green-500/50 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Message"}
                {!isLoading && <Send size={16} />}
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="w-full md:w-1/2 max-w-[400px] mx-auto md:mx-0 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-green-500 text-center md:text-left">Contact Info</h3>
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded bg-white/5 hover:bg-green-500/5 border border-green-500/20 transition-all duration-300"
                >
                  <Icon size={16} className="text-green-500 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-medium text-gray-400">{label}</div>
                    <div className="text-xs text-white">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-3 rounded bg-white/5 border border-green-500/20 text-xs">
              <h4 className="text-base font-bold mb-1 text-green-500">Available for Freelance</h4>
              <p className="text-gray-400">
                I'm available for freelance work. If you have a project that needs to be built, feel free to reach out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
