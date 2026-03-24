import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Doctors, AppointmentRequests } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    emailAddress: '',
    phoneNumber: '',
    selectedDoctor: '',
    preferredDate: '',
    preferredTime: '',
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const result = await BaseCrudService.getAll<Doctors>('doctors');
      setDoctors(result.items);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      await BaseCrudService.create<AppointmentRequests>('appointmentrequests', {
        _id: crypto.randomUUID(),
        patientName: formData.patientName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        selectedDoctor: formData.selectedDoctor,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
      });
      
      setIsSuccess(true);
      setFormData({
        patientName: '',
        emailAddress: '',
        phoneNumber: '',
        selectedDoctor: '',
        preferredDate: '',
        preferredTime: '',
      });
    } catch (error) {
      console.error('Failed to submit appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <div className="flex justify-center">
              <CheckCircle className="w-20 h-20 text-primary" />
            </div>
            <h1 className="font-heading text-4xl lg:text-5xl text-foreground">
              Appointment Request Submitted
            </h1>
            <p className="font-paragraph text-lg text-secondary">
              Thank you for your appointment request. Our team will contact you shortly to confirm your appointment details.
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-paragraph"
            >
              Book Another Appointment
            </Button>
          </motion.div>
        </section>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <Calendar className="w-16 h-16 text-primary" />
            </div>
            <h1 className="font-heading text-5xl lg:text-6xl text-foreground">
              Book an Appointment
            </h1>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              Schedule your visit with one of our experienced doctors. Fill out the form below and we'll confirm your appointment shortly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 lg:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="patientName" className="font-paragraph text-foreground">
                  Full Name *
                </Label>
                <Input
                  id="patientName"
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => handleChange('patientName', e.target.value)}
                  className="font-paragraph"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailAddress" className="font-paragraph text-foreground">
                  Email Address *
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  required
                  value={formData.emailAddress}
                  onChange={(e) => handleChange('emailAddress', e.target.value)}
                  className="font-paragraph"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="font-paragraph text-foreground">
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="font-paragraph"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="selectedDoctor" className="font-paragraph text-foreground">
                Select Doctor *
              </Label>
              <Select
                value={formData.selectedDoctor}
                onValueChange={(value) => handleChange('selectedDoctor', value)}
                required
              >
                <SelectTrigger className="font-paragraph">
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor._id} value={doctor.doctorName || ''}>
                      Dr. {doctor.doctorName} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="preferredDate" className="font-paragraph text-foreground">
                  Preferred Date *
                </Label>
                <Input
                  id="preferredDate"
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => handleChange('preferredDate', e.target.value)}
                  className="font-paragraph"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime" className="font-paragraph text-foreground">
                  Preferred Time *
                </Label>
                <Input
                  id="preferredTime"
                  type="time"
                  required
                  value={formData.preferredTime}
                  onChange={(e) => handleChange('preferredTime', e.target.value)}
                  className="font-paragraph"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-paragraph"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Appointment Request'}
              </Button>
            </div>

            <p className="font-paragraph text-sm text-secondary text-center">
              * Required fields. We'll contact you within 24 hours to confirm your appointment.
            </p>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
