import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Stethoscope, Phone, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-foreground">
              Your Health, Our Priority
            </h1>
            <p className="font-paragraph text-lg text-secondary max-w-xl">
              At Sameeha Medical Centre, we provide comprehensive healthcare services with compassion and expertise. Our team of experienced doctors is dedicated to delivering exceptional patient care in a comfortable, modern environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/appointment">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-paragraph">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-paragraph">
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/03ee5f_16184e300f3940bf891c5904bc2258d5~mv2.png?originWidth=768&originHeight=576"
                alt="Modern medical facility with caring healthcare professionals"
                className="w-full h-full object-cover"
                width={800}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="w-full bg-white py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="flex justify-center">
                <Users className="w-16 h-16 text-primary" />
              </div>
              <h3 className="font-heading text-4xl text-foreground">15+</h3>
              <p className="font-paragraph text-secondary">Expert Doctors</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center space-y-4"
            >
              <div className="flex justify-center">
                <Stethoscope className="w-16 h-16 text-primary" />
              </div>
              <h3 className="font-heading text-4xl text-foreground">20+</h3>
              <p className="font-paragraph text-secondary">Medical Services</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="flex justify-center">
                <Calendar className="w-16 h-16 text-primary" />
              </div>
              <h3 className="font-heading text-4xl text-foreground">24/7</h3>
              <p className="font-paragraph text-secondary">Emergency Care</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-6">
            Why Choose Sameeha Medical Centre
          </h2>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
            We combine medical excellence with compassionate care to provide you with the best healthcare experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-medical-blue-light flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-foreground mb-3">Experienced Specialists</h3>
                <p className="font-paragraph text-secondary">
                  Our team consists of highly qualified doctors with years of experience in their respective fields.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-medical-blue-light flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-foreground mb-3">Comprehensive Services</h3>
                <p className="font-paragraph text-secondary">
                  From general consultations to specialized treatments, we offer a wide range of medical services.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-medical-blue-light flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-foreground mb-3">Flexible Scheduling</h3>
                <p className="font-paragraph text-secondary">
                  Book appointments at your convenience with our easy online booking system.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-medical-blue-light flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-foreground mb-3">Modern Facilities</h3>
                <p className="font-paragraph text-secondary">
                  State-of-the-art equipment and comfortable facilities ensure the best care possible.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground">
              Ready to Take Care of Your Health?
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Schedule an appointment with one of our experienced doctors today and experience quality healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointment">
                <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-paragraph">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg font-paragraph">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
