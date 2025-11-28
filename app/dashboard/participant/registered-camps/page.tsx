// app/dashboard/participant/registered-camps/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, MessageCircle, X, Star } from 'lucide-react';

interface RegisteredCamp {
  id: number;
  campName: string;
  campFees: number;
  participantName: string;
  paymentStatus: 'paid' | 'unpaid';
  confirmationStatus: 'pending' | 'confirmed';
  registrationDate: string;
}

interface Feedback {
  rating: number;
  comment: string;
}

export default function RegisteredCamps() {
  const [camps, setCamps] = useState<RegisteredCamp[]>([]);
  const [filteredCamps, setFilteredCamps] = useState<RegisteredCamp[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCamp, setSelectedCamp] = useState<RegisteredCamp | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    rating: 0,
    comment: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with TanStack Query
    const mockCamps: RegisteredCamp[] = [
      {
        id: 1,
        campName: 'Cardiology Health Camp',
        campFees: 500,
        participantName: 'John Doe',
        paymentStatus: 'paid',
        confirmationStatus: 'confirmed',
        registrationDate: '2024-01-15',
      },
      {
        id: 2,
        campName: 'Dental Care Camp',
        campFees: 300,
        participantName: 'John Doe',
        paymentStatus: 'unpaid',
        confirmationStatus: 'pending',
        registrationDate: '2024-01-20',
      },
      {
        id: 3,
        campName: 'Eye Care Camp',
        campFees: 400,
        participantName: 'John Doe',
        paymentStatus: 'paid',
        confirmationStatus: 'pending',
        registrationDate: '2024-01-25',
      },
    ];

    setCamps(mockCamps);
    setFilteredCamps(mockCamps);
    setLoading(false);
  }, []);

  // Search functionality
  useEffect(() => {
    const results = camps.filter((camp) =>
      camp.campName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCamps(results);
  }, [searchQuery, camps]);

  const handlePayment = (campId: number) => {
    console.log('Processing payment for camp:', campId);
    // Implement Stripe payment integration
  };

  const handleCancel = (campId: number) => {
    console.log('Cancelling registration for camp:', campId);
    // Show confirmation dialog and remove from database
  };

  const handleFeedback = (camp: RegisteredCamp) => {
    setSelectedCamp(camp);
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    if (selectedCamp && feedback.rating > 0) {
      console.log('Submitting feedback for camp:', selectedCamp.id, feedback);
      // Save feedback to database
      setShowFeedbackModal(false);
      setFeedback({ rating: 0, comment: '' });
      setSelectedCamp(null);
    }
  };

  const getStatusColor = (status: string, type: 'payment' | 'confirmation') => {
    if (type === 'payment') {
      return status === 'paid'
        ? 'bg-green-100 text-green-800'
        : 'bg-yellow-100 text-yellow-800';
    }
    return status === 'confirmed'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading registered camps...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Registered Camps</h1>
        <p className="text-muted-foreground mt-2">
          Manage your camp registrations and payments
        </p>
      </div>

      {/* Search and Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search camps by name..."
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredCamps.length} of {camps.length} registered camps
        </p>
      </div>

      {/* Camps Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Camp Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Fees
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Payment Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Confirmation
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCamps.map((camp) => (
                <tr
                  key={camp.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-foreground">
                        {camp.campName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Registered:{' '}
                        {new Date(camp.registrationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-foreground font-medium">
                    ৳{camp.campFees}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        camp.paymentStatus,
                        'payment'
                      )}`}
                    >
                      {camp.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        camp.confirmationStatus,
                        'confirmation'
                      )}`}
                    >
                      {camp.confirmationStatus === 'confirmed'
                        ? 'Confirmed'
                        : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {camp.paymentStatus === 'unpaid' && (
                        <button
                          onClick={() => handlePayment(camp.id)}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                          Pay
                        </button>
                      )}
                      {camp.paymentStatus === 'paid' &&
                        camp.confirmationStatus === 'confirmed' && (
                          <button
                            onClick={() => handleFeedback(camp)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Feedback
                          </button>
                        )}
                      {camp.paymentStatus === 'unpaid' && (
                        <button
                          onClick={() => handleCancel(camp.id)}
                          className="border border-input text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCamps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              {searchQuery
                ? 'No camps found matching your search'
                : 'No camps registered yet'}
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedCamp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-foreground">
                  Feedback for {selectedCamp.campName}
                </h3>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  How would you rate this camp?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedback({ ...feedback, rating: star })}
                      className="text-2xl focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= feedback.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) =>
                    setFeedback({ ...feedback, comment: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Share your experience with this camp..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-border flex space-x-4">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 px-4 py-3 border border-input text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                disabled={feedback.rating === 0}
                className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
