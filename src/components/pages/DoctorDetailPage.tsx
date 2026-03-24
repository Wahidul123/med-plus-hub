import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Doctors } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DoctorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctors | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDoctor();
  }, [id]);

  const loadDoctor = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Doctors>('doctors', id);
      setDoctor(data);
    } catch (error) {
      console.error('Failed to load doctor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-20">
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : !doctor ? (
            <div className="text-center py-20">
              <h2 className="font-heading text-3xl text-foreground mb-4">Doctor Not Found</h2>
              <p className="font-paragraph text-secondary mb-8">
                The doctor you're looking for doesn't exist.
              </p>
              <Link to="/doctors">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Back to Doctors
                </Button>
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 font-paragraph text-secondary hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Doctors
              </Link>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Doctor Image */}
                <div className="aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src={doctor.profileImage || 'https://static.wixstatic.com/media/03ee5f_2e81c91764be464f9feaecee332bff5b~mv2.png?originWidth=576&originHeight=768'}
                    alt={`Dr. ${doctor.doctorName}`}
                    className="w-full h-full object-cover"
                    width={600}
                  />
                </div>

                {/* Doctor Info */}
                <div className="space-y-8">
                  <div>
                    <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
                      Dr. {doctor.doctorName}
                    </h1>
                    <p className="font-paragraph text-xl text-primary font-medium mb-2">
                      {doctor.specialty}
                    </p>
                    <p className="font-paragraph text-lg text-secondary">
                      {doctor.experienceYears} years of experience
                    </p>
                  </div>

                  {doctor.biography && (
                    <div className="space-y-4">
                      <h2 className="font-heading text-2xl text-foreground">Biography</h2>
                      <p className="font-paragraph text-base text-secondary leading-relaxed">
                        {doctor.biography}
                      </p>
                    </div>
                  )}

                  <div className="pt-6">
                    <Link to="/appointment">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-paragraph w-full sm:w-auto">
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
