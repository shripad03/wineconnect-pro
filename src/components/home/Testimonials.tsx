
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  country: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rebecca Klein",
    company: "Fine Wine Imports Ltd.",
    country: "United Kingdom",
    image: "https://source.unsplash.com/random/100x100/?portrait,woman",
    quote: "WineConnectPro has transformed our sourcing process. We can now discover and order directly from Nashik's award-winning wineries with ease, simplifying our supply chain."
  },
  {
    id: 2,
    name: "Michael Chang",
    company: "Asian Wine Distributors",
    country: "Singapore",
    image: "https://source.unsplash.com/random/100x100/?portrait,man",
    quote: "The QR code feature has been a game-changer for our marketing. Our customers love scanning the bottle to learn about the winery's story and Indian wine heritage."
  },
  {
    id: 3,
    name: "Johan Nielson",
    company: "Nordic Wine House",
    country: "Sweden",
    image: "https://source.unsplash.com/random/100x100/?portrait,man",
    quote: "The logistics tracking feature provides peace of mind when importing from India. The platform has opened up a new market for our customers who are eager to explore Indian wines."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <section className="py-16 bg-wine-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold">What Our Buyers Say</h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto mt-4"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 left-0 opacity-20">
            <Quote className="h-24 w-24 rotate-180 text-gold-300" />
          </div>
          
          <div className="carousel relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardContent className="text-center p-6">
                      <p className="text-xl italic mb-8 text-gray-200 relative z-10">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400 mb-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-gold-300">{testimonial.company}</p>
                        <p className="text-sm text-gray-300">{testimonial.country}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute -bottom-10 right-0 opacity-20">
            <Quote className="h-24 w-24 text-gold-300" />
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-transparent border-white text-white hover:bg-white/10"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            {testimonials.map((_, index) => (
              <Button 
                key={index}
                variant="outline"
                size="icon"
                className={`w-3 h-3 rounded-full p-0 ${
                  index === currentIndex 
                    ? 'bg-gold-400 border-gold-400' 
                    : 'bg-transparent border-white'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-transparent border-white text-white hover:bg-white/10"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
