import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Doctors } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Doctors>('doctors');
      setDoctors(result.items);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialty).filter(Boolean)))];
  
  const filteredDoctors = selectedSpecialty === 'All' 
    ? doctors 
    : doctors.filter(d => d.specialty === selectedSpecialty);

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
            <h1 className="font-heading text-5xl lg:text-6xl text-foreground">
              Our Expert Doctors
            </h1>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              Meet our team of highly qualified medical professionals dedicated to providing exceptional care and expertise in their respective fields.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full bg-soft-grey py-8">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`font-paragraph px-6 py-2 rounded transition-colors ${
                  selectedSpecialty === specialty
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-secondary hover:bg-primary/10'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-20">
        <div className="min-h-[600px]">
          {isLoading ? null : filteredDoctors.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/doctors/${doctor._id}`}>
                    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-[3/4] overflow-hidden">
                        <Image
                          src={doctor.profileImage || 'https://static.wixstatic.com/media/03ee5f_bdacc7e8aca74fa4ad72c88dcd042992~mv2.png?originWidth=384&originHeight=512'}
                          alt={`Dr. ${doctor.doctorName}`}
                          className="w-full h-full object-cover"
                          width={400}
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="font-heading text-2xl text-foreground">
                          Dr. {doctor.doctorName}
                        </h3>
                        <p className="font-paragraph text-primary font-medium">
                          {doctor.specialty}
                        </p>
                        <p className="font-paragraph text-sm text-secondary">
                          {doctor.experienceYears} years of experience
                        </p>
                        {doctor.biography && (
                          <p className="font-paragraph text-sm text-secondary line-clamp-3">
                            {doctor.biography}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary">
                No doctors found for the selected specialty.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
