// app/dashboard/organizer/manage-camps/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, Eye, Plus } from 'lucide-react';
import Link from 'next/link';

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
}

export default function ManageCamps() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [filteredCamps, setFilteredCamps] = useState<Camp[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [campToDelete, setCampToDelete] = useState<Camp | null>(null);

  useEffect(() => {
    // Mock data - replace with TanStack Query
    const mockCamps: Camp[] = [
      {
        id: 1,
        name: 'Cardiology Health Camp',
        image: '/images/camp1.jpg',
        fees: 500,
        date: '2024-02-15',
        time: '09:00 AM',
        location: 'Dhaka Medical College',
        healthcareProfessional: 'Dr. Rahman, MBBS, FCPS',
        participantCount: 45,
        description:
          'Free heart checkup and consultation with expert cardiologists',
      },
      {
        id: 2,
        name: 'Dental Care Camp',
        image: '/images/camp2.jpg',
        fees: 300,
        date: '2024-02-20',
        time: '10:00 AM',
        location: 'Chittagong Medical',
        healthcareProfessional: 'Dr. Ahmed, BDS',
        participantCount: 32,
        description: 'Free dental checkup and treatment',
      },
      {
        id: 3,
        name: 'Eye Care Camp',
        image: '/images/camp3.jpg',
        fees: 400,
        date: '2024-02-25',
        time: '08:30 AM',
        location: 'Sylhet Medical',
        healthcareProfessional: 'Dr. Khan, MBBS, DOMS',
        participantCount: 28,
        description: 'Free eye checkup and glasses distribution',
      },
    ];

    setCamps(mockCamps);
    setFilteredCamps(mockCamps);
    setLoading(false);
  }, []);

  // Search functionality
  useEffect(() => {
    const results = camps.filter(
      (camp) =>
        camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.healthcareProfessional
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setFilteredCamps(results);
  }, [searchQuery, camps]);

  const handleDelete = (campId: number) => {
    console.log('Deleting camp:', campId);
    // API call to delete camp
    setCamps(camps.filter((camp) => camp.id !== campId));
    setCampToDelete(null);
  };

  const handleEdit = (campId: number) => {
    console.log('Editing camp:', campId);
    // Navigate to edit page or open edit modal
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading camps...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Camps</h1>
          <p className="text-muted-foreground mt-2">
            View, edit, and manage your medical camps
          </p>
        </div>
        <Link
          href="/dashboard/organizer/add-camp"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Camp
        </Link>
      </div>

      {/* Search and Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search camps by name, location, or doctor..."
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
          Showing {filteredCamps.length} of {camps.length} camps
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Camps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => (
          <div
            key={camp.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
          >
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {camp.name}
                </h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  ৳{camp.fees}
                </span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(camp.date).toLocaleDateString()} at {camp.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{camp.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  <span className="truncate">
                    {camp.healthcareProfessional}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>{camp.participantCount} participants</span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                {camp.description}
              </p>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(camp.id)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => setCampToDelete(camp)}
                  className="flex-1 bg-destructive text-destructive-foreground py-2 rounded-lg hover:bg-destructive/90 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCamps.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-4">
            {searchQuery
              ? 'No camps found matching your search'
              : 'No camps created yet'}
          </div>
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Search
            </button>
          ) : (
            <Link
              href="/dashboard/organizer/add-camp"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Your First Camp
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {campToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Delete Camp</h3>
            </div>

            <div className="p-6">
              <p className="text-foreground mb-4">
                Are you sure you want to delete{' '}
                <strong>"{campToDelete.name}"</strong>? This action cannot be
                undone.
              </p>
              <p className="text-muted-foreground text-sm">
                All registration data for this camp will also be permanently
                deleted.
              </p>
            </div>

            <div className="p-6 border-t border-border flex space-x-4">
              <button
                onClick={() => setCampToDelete(null)}
                className="flex-1 px-4 py-3 border border-input text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(campToDelete.id)}
                className="flex-1 bg-destructive text-destructive-foreground px-4 py-3 rounded-lg hover:bg-destructive/90 transition-colors font-medium"
              >
                Delete Camp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Icon components
const Calendar = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
);
