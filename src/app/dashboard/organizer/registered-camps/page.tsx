// app/dashboard/organizer/registered-camps/page.tsx
'use client';

import { Spinner } from '@/components/ui/spinner';
import useOrganizerRegistrations from '@/hooks/use-organizer-registration';
import { fetchAPI } from '@/lib/api-client';
import { transformToRegisteredCamps } from '@/lib/transform-data';
import { useQueryClient } from '@tanstack/react-query';
import { Check, Filter, Mail, Phone, Search, User, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';

export default function ManageRegisteredCamps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'unpaid' | 'all' | 'paid-confirmed' | 'paid-pending' | undefined
  >('all');
  const session = useSession();
  const queryClient = useQueryClient();
  const { data, isLoading } = useOrganizerRegistrations({
    search: searchQuery,
    status: statusFilter,
  });
  if (!data) {
    return null;
  }

  const registrations = transformToRegisteredCamps(data);
  const totalRegistration = data.pagination.total;
  const getRegistrationCount = () => {
    const count = data?.data.reduce((total, registration) => {
      return total + registration.registrations.length;
    }, 0);
    return count;
  };

  const getConfirmedRegistrationCount = () => {
    const count = data?.data.reduce((total, registration) => {
      return (
        total +
        registration.registrations.filter((r) => r.paymentStatus === 'paid')
          .length
      );
    }, 0);
    return count;
  };

  const getPendingRegistrationCount = () => {
    const count = data?.data.reduce((total, registration) => {
      return (
        total +
        registration.registrations.filter(
          (r) => r.confirmationStatus === 'pending'
        ).length
      );
    }, 0);
    return count;
  };

  const getTotalFees = () => {
    const count = data?.data.reduce((total, registration) => {
      return total + registration.fees;
    }, 0);
    return count;
  };

  const handleConfirm = (registrationId: string) => {
    startTransition(async () => {
      const confirmRegistration = await fetchAPI(
        `/registrations/confirm-registration/${registrationId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${session?.data?.user.accessToken}`,
          },
        }
      );

      if (confirmRegistration.error) {
        toast.error(confirmRegistration.error);
      }

      if (confirmRegistration.data) {
        queryClient.invalidateQueries({
          queryKey: ['organizer-registrations'],
        });
        toast.success('Registration confirmed successfully');
      }
    });
  };

  const handleCancel = (registrationId: string) => {
    startTransition(async () => {
      const cancelRegistration = await fetchAPI(
        `/registrations/cancel-registration/${registrationId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.data?.user.accessToken}`,
          },
        }
      );

      if (cancelRegistration.error) {
        toast.error(cancelRegistration.error);
      }

      if (cancelRegistration.data) {
        queryClient.invalidateQueries({
          queryKey: ['organizer-registrations'],
        });
        toast.success('Registration cancelled successfully');
      }
    });
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
                {getRegistrationCount()}
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
                {getConfirmedRegistrationCount()}
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
                {getPendingRegistrationCount()}
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
                ৳{getTotalFees()}
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
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | 'unpaid'
                      | 'all'
                      | 'paid-confirmed'
                      | 'paid-pending'
                  )
                }
                className="pl-10 pr-8 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                <option value="all">All Registrations</option>
                <option value="paid-confirmed">Paid & Confirmed</option>
                <option value="paid-pending">Paid but Pending</option>
                <option value="unpaid">Unpaid Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {registrations.length} of {totalRegistration} registrations
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Registrations Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {isLoading ? (
          <Spinner className="my-6 w-12 h-12" />
        ) : (
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
                {registrations.map((registration) => (
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
                          {registration.participantName} • {registration.age}{' '}
                          yrs • {registration.gender}
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
                          onClick={() =>
                            handleConfirm(registration.registrationId)
                          }
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
                            onClick={() =>
                              handleConfirm(registration.registrationId)
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1"
                          >
                            <Check className="h-3 w-3" />
                            Confirm
                          </button>
                        )}
                        {registration.confirmationStatus !== 'confirmed' && (
                          <button
                            onClick={() =>
                              handleCancel(registration.registrationId)
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-1"
                          >
                            <X className="h-3 w-3" />
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
        )}

        {registrations.length === 0 && (
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
          Showing 1 to 10 of {totalRegistration} entries
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
