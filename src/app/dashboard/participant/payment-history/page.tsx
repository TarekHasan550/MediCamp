// app/dashboard/participant/payment-history/page.tsx
'use client';

import { Download, Eye, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PaymentHistory {
  id: number;
  campName: string;
  fees: number;
  paymentStatus: 'paid' | 'unpaid' | 'failed';
  confirmationStatus: 'pending' | 'confirmed';
  transactionId?: string;
  paidAt?: string;
  paymentMethod: string;
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentHistory[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with TanStack Query
    const mockPayments: PaymentHistory[] = [
      {
        id: 1,
        campName: 'Cardiology Health Camp',
        fees: 500,
        paymentStatus: 'paid',
        confirmationStatus: 'confirmed',
        transactionId: 'txn_123456789',
        paidAt: '2024-01-15T10:30:00Z',
        paymentMethod: 'Stripe',
      },
      {
        id: 2,
        campName: 'Dental Care Camp',
        fees: 300,
        paymentStatus: 'unpaid',
        confirmationStatus: 'pending',
        paymentMethod: '-',
      },
      {
        id: 3,
        campName: 'Eye Care Camp',
        fees: 400,
        paymentStatus: 'paid',
        confirmationStatus: 'pending',
        transactionId: 'txn_987654321',
        paidAt: '2024-01-20T14:45:00Z',
        paymentMethod: 'Stripe',
      },
      {
        id: 4,
        campName: 'Pediatric Health Camp',
        fees: 350,
        paymentStatus: 'paid',
        confirmationStatus: 'confirmed',
        transactionId: 'txn_456789123',
        paidAt: '2024-01-25T09:15:00Z',
        paymentMethod: 'Stripe',
      },
      {
        id: 5,
        campName: 'Orthopedic Camp',
        fees: 600,
        paymentStatus: 'failed',
        confirmationStatus: 'pending',
        paymentMethod: 'Stripe',
      },
    ];

    setPayments(mockPayments);
    setFilteredPayments(mockPayments);
    setLoading(false);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let results = payments.filter(
      (payment) =>
        payment.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (payment.transactionId &&
          payment.transactionId
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
    );

    if (statusFilter !== 'all') {
      results = results.filter(
        (payment) => payment.paymentStatus === statusFilter
      );
    }

    setFilteredPayments(results);
  }, [searchQuery, statusFilter, payments]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfirmationColor = (status: string) => {
    return status === 'confirmed'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownloadReceipt = (payment: PaymentHistory) => {
    console.log('Downloading receipt for:', payment.transactionId);
    // Implement receipt download logic
  };

  const handleViewDetails = (payment: PaymentHistory) => {
    console.log('Viewing details for:', payment.transactionId);
    // Implement view details logic
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading payment history...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payment History</h1>
        <p className="text-muted-foreground mt-2">
          View your camp payment transactions and receipts
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Payments
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {payments.filter((p) => p.paymentStatus === 'paid').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Spent
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                ৳
                {payments
                  .filter((p) => p.paymentStatus === 'paid')
                  .reduce((sum, p) => sum + p.fees, 0)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {payments.filter((p) => p.paymentStatus === 'unpaid').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Failed
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {payments.filter((p) => p.paymentStatus === 'failed').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <div className="w-6 h-6 bg-red-600 rounded-full"></div>
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
              placeholder="Search by camp name or transaction ID..."
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
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredPayments.length} of {payments.length} transactions
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Payments Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Camp Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Amount
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Payment Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Confirmation
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Transaction ID
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <p className="font-medium text-foreground">
                      {payment.campName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment.paymentMethod}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-foreground font-medium">
                    ৳{payment.fees}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        payment.paymentStatus
                      )}`}
                    >
                      {payment.paymentStatus.charAt(0).toUpperCase() +
                        payment.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getConfirmationColor(
                        payment.confirmationStatus
                      )}`}
                    >
                      {payment.confirmationStatus.charAt(0).toUpperCase() +
                        payment.confirmationStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-mono text-muted-foreground">
                      {payment.transactionId || 'N/A'}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-muted-foreground">
                      {payment.paidAt ? formatDate(payment.paidAt) : 'N/A'}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {payment.paymentStatus === 'paid' && (
                        <button
                          onClick={() => handleDownloadReceipt(payment)}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Receipt
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetails(payment)}
                        className="flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              {searchQuery || statusFilter !== 'all'
                ? 'No transactions found matching your criteria'
                : 'No payment history available'}
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

      {/* Pagination (Assignment Requirement) */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing 1 to 10 of {filteredPayments.length} entries
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
