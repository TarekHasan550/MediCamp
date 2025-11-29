// app/dashboard/organizer/registered-camps/page.tsx
'use client';

import { Check, Filter, Mail, Phone, Search, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RegisteredCamp {
  id: number;
  campName: string;
  campFees: number;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  age: number;
  gender: string;
  emergencyContact: string;
  paymentStatus: 'paid' | 'unpaid';
  confirmationStatus: 'pending' | 'confirmed';
  registrationDate: string;
}

export default function ManageRegisteredCamps() {
  const [registrations, setRegistrations] = useState<RegisteredCamp[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    RegisteredCamp[]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with TanStack Query
    const mockRegistrations: RegisteredCamp[] = [
      {
        id: 1,
        campName: 'Cardiology Health Camp',
        campFees: 500,
        participantName: 'John Doe',
        participantEmail: 'john@example.com',
        participantPhone: '+880 1234-567890',
        age: 28,
        gender: 'male',
        emergencyContact: '+880 9876-543210',
        paymentStatus: 'paid',
        confirmationStatus: 'confirmed',
        registrationDate: '2024-01-15',
      },
      {
        id: 2,
        campName: 'Dental Care Camp',
        campFees: 300,
        participantName: 'Sarah Smith',
        participantEmail: 'sarah@example.com',
        participantPhone: '+880 1234-567891',
        age: 32,
        gender: 'female',
        emergencyContact: '+880 9876-543211',
        paymentStatus: 'unpaid',
        confirmationStatus: 'pending',
        registrationDate: '2024-01-20',
      },
      {
        id: 3,
        campName: 'Eye Care Camp',
        campFees: 400,
        participantName: 'Mike Johnson',
        participantEmail: 'mike@example.com',
        participantPhone: '+880 1234-567892',
        age: 45,
        gender: 'male',
        emergencyContact: '+880 9876-543212',
        paymentStatus: 'paid',
        confirmationStatus: 'pending',
        registrationDate: '2024-01-25',
      },
    ];

    setRegistrations(mockRegistrations);
    setFilteredRegistrations(mockRegistrations);
    setLoading(false);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let results = registrations.filter(
      (registration) =>
        registration.campName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        registration.participantName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        registration.participantEmail
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    if (statusFilter !== 'all') {
      if (statusFilter === 'paid') {
        results = results.filter((reg) => reg.paymentStatus === 'paid');
      } else if (statusFilter === 'unpaid') {
        results = results.filter((reg) => reg.paymentStatus === 'unpaid');
      } else if (statusFilter === 'confirmed') {
        results = results.filter(
          (reg) => reg.confirmationStatus === 'confirmed'
        );
      } else if (statusFilter === 'pending') {
        results = results.filter((reg) => reg.confirmationStatus === 'pending');
      }
    }

    setFilteredRegistrations(results);
  }, [searchQuery, statusFilter, registrations]);

  const handleConfirm = (registrationId: number) => {
    console.log('Confirming registration:', registrationId);
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.id === registrationId
          ? { ...reg, confirmationStatus: 'confirmed' as const }
          : reg
      )
    );
  };

  const handleCancel = (registrationId: number) => {
    console.log('Cancelling registration:', registrationId);
    // Show confirmation dialog first
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      setRegistrations((prev) =>
        prev.filter((reg) => reg.id !== registrationId)
      );
    }
  };

  const canCancel = (registration: RegisteredCamp) => {
    return !(
      registration.paymentStatus === 'paid' &&
      registration.confirmationStatus === 'confirmed'
    );
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
        <div className="text-muted-foreground">Loading registrations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Manage Registered Camps
        </h1>
        <p className="text-muted-foreground mt-2">
          View and manage participant registrations for your camps
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Registrations
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {registrations.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Paid Registrations
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {registrations.filter((r) => r.paymentStatus === 'paid').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending Confirmation
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {
                  registrations.filter(
                    (r) => r.confirmationStatus === 'pending'
                  ).length
                }
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Filter className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                ৳
                {registrations
                  .filter((r) => r.paymentStatus === 'paid')
                  .reduce((sum, r) => sum + r.campFees, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-lg font-bold text-purple-600">৳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search by camp name, participant name, or email..."
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending Confirmation</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredRegistrations.length} of {registrations.length}{' '}
          registrations
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Registrations Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Camp & Participant
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Fees
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Payment
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Confirmation
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Contact
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((registration) => (
                <tr
                  key={registration.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-foreground">
                        {registration.campName}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {registration.participantName} • {registration.age} yrs
                        • {registration.gender}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Registered:{' '}
                        {new Date(
                          registration.registrationDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-foreground font-medium">
                    ৳{registration.campFees}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        registration.paymentStatus,
                        'payment'
                      )}`}
                    >
                      {registration.paymentStatus === 'paid'
                        ? 'Paid'
                        : 'Unpaid'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {registration.confirmationStatus === 'pending' ? (
                      <button
                        onClick={() => handleConfirm(registration.id)}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      >
                        Pending
                      </button>
                    ) : (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          registration.confirmationStatus,
                          'confirmation'
                        )}`}
                      >
                        Confirmed
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {registration.participantEmail}
                      </p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {registration.participantPhone}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Emergency: {registration.emergencyContact}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {registration.confirmationStatus === 'pending' && (
                        <button
                          onClick={() => handleConfirm(registration.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => handleCancel(registration.id)}
                        disabled={!canCancel(registration)}
                        className="bg-destructive text-destructive-foreground px-3 py-1 rounded-lg hover:bg-destructive/90 transition-colors text-sm font-medium flex items-center gap-1 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                      >
                        <X className="h-3 w-3" />
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRegistrations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              {searchQuery || statusFilter !== 'all'
                ? 'No registrations found matching your criteria'
                : 'No registrations available'}
            </div>
            {(searchQuery || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing 1 to 10 of {filteredRegistrations.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-input rounded-lg text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg">
            1
          </button>
          <button className="px-3 py-2 border border-input rounded-lg text-foreground hover:bg-muted transition-colors">
            2
          </button>
          <button className="px-3 py-2 border border-input rounded-lg text-foreground hover:bg-muted transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
