import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { MedicalServices } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const [services, setServices] = useState<MedicalServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<MedicalServices>('medicalservices');
      setServices(result.items);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];
  
  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

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
              Our Medical Services
            </h1>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              Comprehensive healthcare services designed to meet all your medical needs with the highest standards of care and professionalism.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full bg-soft-grey py-8">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-paragraph px-6 py-2 rounded transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-secondary hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-20">
        <div className="min-h-[600px]">
          {isLoading ? null : filteredServices.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="grid md:grid-cols-5 gap-6">
                    <div className="md:col-span-2 aspect-square md:aspect-auto overflow-hidden">
                      <Image
                        src={service.serviceImage || 'https://static.wixstatic.com/media/03ee5f_90b43ca5129043ca89ceb11b23282794~mv2.png?originWidth=256&originHeight=256'}
                        alt={service.serviceName || 'Medical service'}
                        className="w-full h-full object-cover"
                        width={300}
                      />
                    </div>
                    <div className="md:col-span-3 p-6 space-y-4">
                      <div>
                        <h3 className="font-heading text-2xl text-foreground mb-2">
                          {service.serviceName}
                        </h3>
                        {service.category && (
                          <p className="font-paragraph text-sm text-primary font-medium">
                            {service.category}
                          </p>
                        )}
                      </div>
                      
                      {service.shortDescription && (
                        <p className="font-paragraph text-base text-secondary">
                          {service.shortDescription}
                        </p>
                      )}
                      
                      {service.detailedDescription && (
                        <p className="font-paragraph text-sm text-secondary line-clamp-3">
                          {service.detailedDescription}
                        </p>
                      )}
                      
                      {service.preparationInstructions && (
                        <div className="pt-2">
                          <p className="font-paragraph text-sm text-secondary">
                            <span className="font-medium text-foreground">Preparation: </span>
                            {service.preparationInstructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary">
                No services found for the selected category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
