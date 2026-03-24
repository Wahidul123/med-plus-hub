import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs');
      setFaqs(result.items);
    } catch (error) {
      console.error('Failed to load FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))];
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === selectedCategory);

  const featuredFAQs = filteredFAQs.filter(f => f.isFeatured);
  const regularFAQs = filteredFAQs.filter(f => !f.isFeatured);

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
              Frequently Asked Questions
            </h1>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              Find answers to common questions about our services, appointments, and patient care. If you can't find what you're looking for, please contact us.
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

      {/* FAQs */}
      <section className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-20">
        <div className="min-h-[600px]">
          {isLoading ? null : filteredFAQs.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              {/* Featured FAQs */}
              {featuredFAQs.length > 0 && (
                <div className="space-y-6">
                  <h2 className="font-heading text-3xl text-foreground">Popular Questions</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {featuredFAQs.map((faq) => (
                      <AccordionItem
                        key={faq._id}
                        value={faq._id}
                        className="bg-white rounded-lg px-6 border-none"
                      >
                        <AccordionTrigger className="font-paragraph text-lg text-foreground hover:text-primary py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="font-paragraph text-base text-secondary pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Regular FAQs */}
              {regularFAQs.length > 0 && (
                <div className="space-y-6">
                  {featuredFAQs.length > 0 && (
                    <h2 className="font-heading text-3xl text-foreground">More Questions</h2>
                  )}
                  <Accordion type="single" collapsible className="space-y-4">
                    {regularFAQs.map((faq) => (
                      <AccordionItem
                        key={faq._id}
                        value={faq._id}
                        className="bg-white rounded-lg px-6 border-none"
                      >
                        <AccordionTrigger className="font-paragraph text-lg text-foreground hover:text-primary py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="font-paragraph text-base text-secondary pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary">
                No FAQs found for the selected category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
