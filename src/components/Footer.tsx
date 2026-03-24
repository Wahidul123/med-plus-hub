import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-white">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl text-white">
              Sameeha Medical Centre
            </h3>
            <p className="font-paragraph text-sm text-white/80">
              Providing exceptional healthcare services with compassion and expertise. Your health is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-white">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/doctors"
                className="font-paragraph text-sm text-white/80 hover:text-white transition-colors"
              >
                Our Doctors
              </Link>
              <Link
                to="/services"
                className="font-paragraph text-sm text-white/80 hover:text-white transition-colors"
              >
                Medical Services
              </Link>
              <Link
                to="/appointment"
                className="font-paragraph text-sm text-white/80 hover:text-white transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                to="/faq"
                className="font-paragraph text-sm text-white/80 hover:text-white transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-white">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-paragraph text-sm text-white/80">+1 (555) 123-4567</p>
                  <p className="font-paragraph text-xs text-white/60">Emergency: 24/7</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <p className="font-paragraph text-sm text-white/80">info@sameehamedical.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <p className="font-paragraph text-sm text-white/80">
                  123 Healthcare Avenue<br />
                  Medical District, City 12345
                </p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-white">Operating Hours</h4>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <div>
                  <p className="font-paragraph text-sm text-white/80">Monday - Friday</p>
                  <p className="font-paragraph text-sm text-white/60">8:00 AM - 8:00 PM</p>
                </div>
                <div>
                  <p className="font-paragraph text-sm text-white/80">Saturday</p>
                  <p className="font-paragraph text-sm text-white/60">9:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="font-paragraph text-sm text-white/80">Sunday</p>
                  <p className="font-paragraph text-sm text-white/60">Emergency Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-white/60">
              © {new Date().getFullYear()} Sameeha Medical Centre. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/contact"
                className="font-paragraph text-sm text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className="font-paragraph text-sm text-white/60 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
