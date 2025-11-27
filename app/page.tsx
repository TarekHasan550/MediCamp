'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/navbar/Navbar';

// Define interfaces
interface Camp {
  id: number;
  name: string;
  image: string;
  fees: number;
  date: string;
  location: string;
  professional: string;
  participants: number;
  description: string;
}

interface Feedback {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
}

interface SuccessStory {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface StarIconProps {
  filled: boolean;
}

const Home = () => {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const mockCamps: Camp[] = [
      {
        id: 1,
        name: 'Cardiology Health Camp',
        image: '/images/camp1.jpg',
        fees: 500,
        date: '2024-02-15',
        location: 'Dhaka Medical College',
        professional: 'Dr. Rahman',
        participants: 45,
        description: 'Free heart checkup and consultation',
      },
      // ... more camps
    ];
    setCamps(mockCamps);
  }, []);

  useEffect(() => {
    const mockFeedback: Feedback[] = [
      {
        id: 1,
        userName: 'John Doe',
        userImage: '/images/user1.jpg',
        rating: 5,
        comment: 'Excellent service and professional doctors!',
      },
      // ... more feedback
    ];
    setFeedback(mockFeedback);
  }, []);

  const successStories: SuccessStory[] = [
    {
      id: 1,
      title: '1000+ Patients Served',
      description:
        'Our camps have provided free healthcare to over 1000 patients',
      image: '/images/success1.jpg',
    },
    // ... more stories
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Navigation */}
      <Navbar />

      {/* Banner Slider */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {successStories[currentSlide]?.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              {successStories[currentSlide]?.description}
            </p>
          </motion.div>

          {/* Slider Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentSlide ? 'bg-background' : 'bg-background/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Camps Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-4">
              Popular Medical Camps
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join our most sought-after healthcare camps with expert medical
              professionals
            </p>
          </div>

          {/* Camps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {camps.map((camp) => (
              <motion.div
                key={camp.id}
                whileHover={{ y: -5 }}
                className="bg-background rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={camp.image}
                  alt={camp.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-muted-foreground">
                      {camp.name}
                    </h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      ৳{camp.fees}
                    </span>
                  </div>

                  <div className="space-y-2 text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon />
                      <span>{new Date(camp.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LocationIcon />
                      <span>{camp.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DoctorIcon />
                      <span>{camp.professional}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UsersIcon />
                      <span>{camp.participants} Participants</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {camp.description}
                  </p>

                  <a
                    href={`/camp-details/${camp.id}`}
                    className="block w-full bg-primary/90 text-background text-center py-3 rounded-lg hover:bg-primary transition font-medium"
                  >
                    View Details
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See All Camps Button */}
          <div className="text-center">
            <a
              href="/available-camps"
              className="inline-flex items-center space-x-2 bg-muted-foreground text-background px-8 py-3 rounded-lg hover:bg-muted-foreground transition font-medium"
            >
              <span>See All Camps</span>
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Feedback & Ratings Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-4">
              Participant Feedback
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our participants say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedback.map((review) => (
              <div
                key={review.id}
                className="bg-background p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-muted-foreground">
                      {review.userName}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {/* {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < review.rating} />
                      ))} */}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Section: Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-4">
              Why Choose MediCamp?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ExpertIcon />,
                title: 'Expert Doctors',
                description:
                  'Qualified healthcare professionals with years of experience',
              },
              {
                icon: <AffordableIcon />,
                title: 'Affordable Care',
                description: 'Quality healthcare services at reasonable prices',
              },
              {
                icon: <CommunityIcon />,
                title: 'Community Focus',
                description: 'Serving local communities with personalized care',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MediCamp</h3>
              <p className="text-muted">
                Providing quality healthcare services through organized medical
                camps.
              </p>
            </div>
            {/* Add more footer columns as needed */}
          </div>
        </div>
      </footer>
    </div>
  );
};

// Icon components (you can replace with actual icons)
const CalendarIcon = () => <span>📅</span>;
const LocationIcon = () => <span>📍</span>;
const DoctorIcon = () => <span>👨‍⚕️</span>;
const UsersIcon = () => <span>👥</span>;
const ArrowRightIcon = () => <span>→</span>;
// const StarIcon = ({ filled }) => <span>{filled ? '⭐' : '☆'}</span>;
const ExpertIcon = () => <span>🎓</span>;
const AffordableIcon = () => <span>💰</span>;
const CommunityIcon = () => <span>🤝</span>;

export default Home;
