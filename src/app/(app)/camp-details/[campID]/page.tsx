// app/camp-details/[id]/page.tsx
'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Star,
  User,
  Users,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Camp {
  id: number;
  name: string;
  image: string;
  fees: number;
  date: string;
  time: string;
  location: string;
  healthcareProfessional: string;
  participantCount: number;
  description: string;
  detailedDescription: string;
  services: string[];
}

interface Feedback {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

const CampDetails = () => {
  const params = useParams();
  const campId = params.id;

  const [camp, setCamp] = useState<Camp | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch camp details
  useEffect(() => {
    const fetchCampDetails = async () => {
      try {
        // Mock data - replace with actual API call
        const mockCamp: Camp = {
          id: 1,
          name: 'Cardiology Health Camp',
          image: '/images/camp1.jpg',
          fees: 500,
          date: '2024-02-15',
          time: '09:00 AM - 04:00 PM',
          location: 'Dhaka Medical College Hospital, Dhaka',
          healthcareProfessional: 'Dr. Mohammad Rahman, MBBS, FCPS',
          participantCount: 45,
          description: 'Free heart checkup and consultation',
          detailedDescription:
            'Join our comprehensive cardiology health camp offering free heart checkups, ECG tests, blood pressure monitoring, and consultations with renowned cardiologists. This camp is designed to provide accessible cardiac care to the community.',
          services: [
            'Free ECG Test',
            'Blood Pressure Check',
            'Cholesterol Screening',
            'Cardiology Consultation',
            'Dietary Advice',
            'Follow-up Recommendations',
          ],
        };

        const mockFeedback: Feedback[] = [
          {
            id: 1,
            userName: 'Abdul Karim',
            userImage: '/images/user1.jpg',
            rating: 5,
            comment:
              'Excellent service! The doctors were very professional and caring.',
            date: '2024-01-15',
          },
          {
            id: 2,
            userName: 'Fatima Begum',
            userImage: '/images/user2.jpg',
            rating: 4,
            comment:
              'Very organized camp. Got my heart checked properly for the first time.',
            date: '2024-01-10',
          },
          {
            id: 3,
            userName: 'Rajesh Sharma',
            userImage: '/images/user3.jpg',
            rating: 5,
            comment:
              'Free ECG test was very helpful. Thank you for this initiative!',
            date: '2024-01-08',
          },
        ];

        setCamp(mockCamp);
        setFeedback(mockFeedback);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching camp details:', error);
        setLoading(false);
      }
    };

    fetchCampDetails();
  }, [campId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Loading camp details...</div>
      </div>
    );
  }

  if (!camp) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Camp not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Camp Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Camp Image */}
          <div className="relative">
            <Image
              src={camp.image}
              alt={camp.name}
              fill
              className="object-cover rounded-xl shadow-sm"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Camp Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {camp.name}
              </h1>
              <p className="text-muted-foreground text-lg">
                {camp.description}
              </p>
            </div>

            {/* Key Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-foreground font-semibold">
                  Camp Fees: ৳{camp.fees}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span>
                  {new Date(camp.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>{camp.time}</span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{camp.location}</span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <User className="h-5 w-5 text-primary" />
                <span>{camp.healthcareProfessional}</span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <Users className="h-5 w-5 text-primary" />
                <span>{camp.participantCount} Participants Registered</span>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsRegistrationModalOpen(true)}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
            >
              Join This Camp
            </motion.button>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description & Services */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Description */}
            <section className="bg-card border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About This Camp
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {camp.detailedDescription}
              </p>
            </section>

            {/* Services Offered */}
            <section className="bg-card border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Services Offered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {camp.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Feedback & Ratings */}
            <section className="bg-card border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Participant Feedback
              </h2>
              <div className="space-y-6">
                {feedback.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-border pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <img
                        src={review.userImage}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {review.userName}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Quick Info & Related Camps */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Camp Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-semibold text-foreground">
                    ৳{camp.fees}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-foreground">
                    {new Date(camp.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-semibold text-foreground">
                    {camp.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-semibold text-foreground">
                    {camp.participantCount}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsRegistrationModalOpen(true)}
                className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Register Now
              </button>
            </div>

            {/* Healthcare Professional */}
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Healthcare Professional
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {camp.healthcareProfessional.split(',')[0]}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {camp.healthcareProfessional.split(',')[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <RegistrationModal
          camp={camp}
          onClose={() => setIsRegistrationModalOpen(false)}
        />
      )}
    </div>
  );
};

// Registration Modal Component
interface RegistrationModalProps {
  camp: Camp;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  camp,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    participantName: 'John Doe', // Would come from logged in user
    participantEmail: 'john@example.com', // Would come from logged in user
    age: '',
    phone: '',
    gender: '',
    emergencyContact: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', { camp, ...formData });
    // Show success alert and close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">
              Join <span className="text-primary">{camp.name}</span>
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer"
            >
              <X />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Read-only Camp Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <label className="text-sm font-medium text-muted-foreground/50">
                Camp Name
              </label>
              <p className="text-muted-foreground/80 font-semibold">
                {camp.name}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground/50">
                Camp Fees
              </label>
              <p className="text-green-600 font-semibold">৳{camp.fees}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground/50">
                Location
              </label>
              <p className="text-muted-foreground/80 font-semibold">
                {camp.location}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground/50">
                Healthcare Professional
              </label>
              <p className="font-semibold text-primary">
                {camp.healthcareProfessional}
              </p>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Participant Name</Label>
              <Input
                disabled
                type="text"
                value={formData.participantName}
                onChange={(e) =>
                  setFormData({ ...formData, participantName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Participant Email</Label>
              <Input
                disabled
                type="email"
                value={formData.participantEmail}
                onChange={(e) =>
                  setFormData({ ...formData, participantEmail: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Age</Label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(e) => setFormData({ ...formData, gender: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Emergency Contact</Label>
              <Input
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyContact: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-input text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Confirm Registration
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CampDetails;
