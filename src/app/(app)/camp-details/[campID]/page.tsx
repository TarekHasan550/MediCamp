// app/camp-details/[id]/page.tsx
'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import useCampDetails from '@/hooks/use-camp-details';
import { fetchAPI } from '@/lib/api-client';
import ImageExtract from '@/lib/image-extract';
import {
  AlertCircle,
  Calendar,
  Clock,
  DollarSign,
  LucideMoveUpRight,
  MapPin,
  MessageSquare,
  Star,
  User,
  Users,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { toast } from 'sonner';

export interface Camp {
  _id: string;
  name: string;
  description: string;
  image: string;
  fees: number;
  dateTime: string;
  location: string;
  professional: string;
  organizer: string;
  participantCount: number;
  createdAt: string;
  updatedAt: string;
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
  const id = params.campID as string;
  const { data: session, status: sessionStatus } = useSession();
  const { data: camp, isLoading, isError, error } = useCampDetails(id);

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback[]>([
    // Mock data - replace with real API call
    {
      id: 1,
      userName: 'Sarah Johnson',
      userImage: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      comment:
        'Excellent medical camp! The doctors were very professional and caring.',
      date: '2025-12-01',
    },
    {
      id: 2,
      userName: 'Michael Chen',
      userImage: 'https://i.pravatar.cc/150?img=2',
      rating: 4,
      comment: 'Great experience overall. Well organized and helpful staff.',
      date: '2025-11-28',
    },
  ]);

  // Handle session loading
  if (sessionStatus === 'loading' || isLoading) {
    return <LoadingSkeleton />;
  }

  // Handle unauthenticated
  if (sessionStatus === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please log in to view camp details.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Handle errors
  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error?.message || 'Failed to load camp details'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Handle no data
  if (!camp) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Camp not found</div>
      </div>
    );
  }

  const imageUrl = ImageExtract(camp.image);
  const campDate = new Date(camp.dateTime);

  const isOrganizer = session?.user.role === 'organizer';
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Camp Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Camp Image */}
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={camp.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-camp.jpg';
              }}
            />
          </div>

          {/* Camp Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {camp.name}
              </h1>
              <p className="text-muted-foreground text-lg line-clamp-3">
                {camp.description}
              </p>
            </div>

            {/* Key Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <span className="text-foreground font-semibold">
                  {camp.fees === 0 ? 'FREE' : `৳${camp.fees}`}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <Calendar className="h-5 w-5 text-emerald-600" />
                <span>
                  {campDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-emerald-600" />
                <span>
                  {campDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span>{camp.location}</span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <User className="h-5 w-5 text-emerald-600" />
                <span>Dr. {camp.professional}</span>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <Users className="h-5 w-5 text-emerald-600" />
                <span>{camp.participantCount} Participants Registered</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                disabled={isOrganizer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRegistrationModalOpen(true)}
                className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-lg disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Join This Camp
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isOrganizer}
                onClick={() => setIsFeedbackModalOpen(true)}
                className="w-full border-2 border-emerald-600 text-emerald-600 py-4 rounded-lg hover:bg-emerald-50 transition-colors font-semibold text-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                <MessageSquare className="h-5 w-5" />
                Leave Feedback
              </motion.button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description & Feedback */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Description */}
            <section className="bg-card border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About This Camp
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {camp.description}
              </p>
            </section>

            {/* Feedback & Ratings */}
            <section className="bg-card border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Participant Feedback
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFeedbackModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Add Feedback
                </Button>
              </div>

              {feedback.length > 0 ? (
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
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No feedback yet. Be the first to share your experience!
                  </p>
                  <Button
                    onClick={() => setIsFeedbackModalOpen(true)}
                    variant="outline"
                  >
                    Add Feedback
                  </Button>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Quick Info */}
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
                    {camp.fees === 0 ? 'FREE' : `৳${camp.fees}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-foreground">
                    {campDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-semibold text-foreground">
                    {campDate.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
                disabled={isOrganizer}
                type="button"
                onClick={() => setIsRegistrationModalOpen(true)}
                className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold disabled:cursor-not-allowed disabled:bg-gray-400"
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
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Dr. {camp.professional}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Medical Specialist
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

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <FeedbackModal
          camp={camp}
          onClose={() => setIsFeedbackModalOpen(false)}
          onSubmit={(newFeedback) => {
            setFeedback([newFeedback, ...feedback]);
            setIsFeedbackModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Skeleton className="h-[400px] rounded-xl" />
          <div className="space-y-6">
            <div>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6 mt-2" />
            </div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </main>
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
  const { data: session } = useSession();
  const [isPending, setIsPending] = useTransition();
  const [formData, setFormData] = useState({
    participantName: session?.user?.name || '',
    participantEmail: session?.user?.email || '',
    age: '',
    phone: '',
    gender: '',
    emergencyContact: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(async () => {
      const { data, error } = await fetchAPI(
        `/registrations/create/${camp._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            age: formData.age,
            phone: formData.phone,
            gender: formData.gender,
            emergencyContact: formData.emergencyContact,
          }),
        }
      );
      if (error) {
        toast.error(error);
        return;
      }
      if (data.status === 'success') {
        toast.success('Registration successful');
        onClose();
      }
    });
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
              Join <span className="text-emerald-600">{camp.name}</span>
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Read-only Camp Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Camp Name
              </label>
              <p className="text-foreground font-semibold">{camp.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Camp Fees
              </label>
              <p className="text-emerald-600 font-semibold">
                {camp.fees === 0 ? 'FREE' : `৳${camp.fees}`}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Location
              </label>
              <p className="text-foreground font-semibold">{camp.location}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Healthcare Professional
              </label>
              <p className="font-semibold text-emerald-600">
                Dr. {camp.professional}
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
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Participant Email</Label>
              <Input
                disabled
                type="email"
                value={formData.participantEmail}
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
                min="1"
                max="120"
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
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <Button size={'lg'} type="button" onClick={onClose}>
              <IoCloseSharp />
              Cancel
            </Button>
            <Button
              type="submit"
              size={'lg'}
              className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              {isPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <span className="ml-2">Submit</span>
                  <LucideMoveUpRight />
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Feedback Modal Component
interface FeedbackModalProps {
  camp: Camp;
  onClose: () => void;
  onSubmit: (feedback: Feedback) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  camp,
  onClose,
  onSubmit,
}) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    const newFeedback: Feedback = {
      id: Date.now(),
      userName: session?.user?.name || 'Anonymous',
      userImage: session?.user?.image || 'https://i.pravatar.cc/150',
      rating,
      comment,
      date: new Date().toISOString(),
    };

    // TODO: API call to submit feedback
    console.log('Feedback data:', { campId: camp._id, ...newFeedback });

    onSubmit(newFeedback);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl max-w-md w-full"
      >
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">
              Leave Feedback
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Camp Info */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Feedback for</p>
            <p className="font-semibold text-foreground">{camp.name}</p>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating} / 5
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label>Your Feedback *</Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience about this medical camp..."
              rows={5}
              required
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-input text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CampDetails;
