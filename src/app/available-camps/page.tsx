// app/available-camps/page.tsx
'use client';

import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/navbar/Navbar';
import { Filter, Grid2X2, Grid3X3, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
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
}

const AvlCamps = () => {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [filteredCamps, setFilteredCamps] = useState<Camp[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'participants' | 'fees' | 'name'>(
    'participants'
  );
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Fetch all camps
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        // Mock data - replace with actual API call
        const mockCamps: Camp[] = [
          {
            id: 1,
            name: 'Cardiology Health Camp',
            image: '/images/camp1.jpg',
            fees: 500,
            date: '2024-02-15',
            time: '09:00 AM',
            location: 'Dhaka Medical College',
            healthcareProfessional: 'Dr. Rahman',
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
            healthcareProfessional: 'Dr. Ahmed',
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
            healthcareProfessional: 'Dr. Khan',
            participantCount: 28,
            description: 'Free eye checkup and glasses distribution',
          },
          {
            id: 4,
            name: 'Pediatric Health Camp',
            image: '/images/camp4.jpg',
            fees: 350,
            date: '2024-03-01',
            time: '09:30 AM',
            location: 'Rajshahi Medical',
            healthcareProfessional: 'Dr. Fatima',
            participantCount: 38,
            description: 'Child healthcare and vaccination camp',
          },
          {
            id: 5,
            name: 'Orthopedic Camp',
            image: '/images/camp5.jpg',
            fees: 600,
            date: '2024-03-05',
            time: '08:00 AM',
            location: 'Khulna Medical',
            healthcareProfessional: 'Dr. Hossain',
            participantCount: 25,
            description: 'Bone and joint care specialist camp',
          },
          {
            id: 6,
            name: 'General Health Checkup',
            image: '/images/camp6.jpg',
            fees: 200,
            date: '2024-03-10',
            time: '07:30 AM',
            location: 'Barisal Medical',
            healthcareProfessional: 'Dr. Chowdhury',
            participantCount: 52,
            description: 'Complete body health checkup camp',
          },
        ];

        setCamps(mockCamps);
        setFilteredCamps(mockCamps);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching camps:', error);
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  // Filter and sort camps
  useEffect(() => {
    let result = camps.filter(
      (camp) =>
        camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.healthcareProfessional
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    // Sort results
    result = result.sort((a, b) => {
      switch (sortBy) {
        case 'participants':
          return b.participantCount - a.participantCount;
        case 'fees':
          return a.fees - b.fees;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredCamps(result);
  }, [camps, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Loading camps...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Available Medical Camps
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover all our upcoming medical camps and find the perfect one for
            your needs
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search Bar */}
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

            {/* Sort and Layout Controls */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Sort Dropdown */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <select
                  className="pl-10 pr-8 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="participants">Most Registered</option>
                  <option value="fees">Camp Fees</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>

              {/* Layout Toggle */}
              <div className="flex border border-input rounded-lg overflow-hidden">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-3 transition-colors ${
                    layout === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-3 transition-colors ${
                    layout === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCamps.length} of {camps.length} camps
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Camps Grid/List */}
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'grid grid-cols-1 gap-6'
          }
        >
          {filteredCamps.map((camp) => (
            <CampCard key={camp.id} camp={camp} layout={layout} />
          ))}
        </div>

        {/* No Results */}
        {filteredCamps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              No camps found matching your search criteria
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

// Camp Card Component
interface CampCardProps {
  camp: Camp;
  layout: 'grid' | 'list';
}

const CampCard: React.FC<CampCardProps> = ({ camp, layout }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all ${
        layout === 'list' ? 'flex' : ''
      }`}
    >
      <img
        src={camp.image}
        alt={camp.name}
        className={`${
          layout === 'list' ? 'w-48 h-48' : 'w-full h-48'
        } object-cover`}
      />

      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-foreground">{camp.name}</h3>
          <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
            ৳{camp.fees}
          </span>
        </div>

        <div className="space-y-2 text-muted-foreground mb-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon />
            <span>
              {new Date(camp.date).toLocaleDateString()} at {camp.time}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <LocationIcon />
            <span>{camp.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DoctorIcon />
            <span>{camp.healthcareProfessional}</span>
          </div>
          <div className="flex items-center space-x-2">
            <UsersIcon />
            <span>{camp.participantCount} Participants</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
          {camp.description}
        </p>

        <Link
          href={`/camp-details/${camp.id}`}
          className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

// Icon Components
const CalendarIcon = () => <span className="text-primary">📅</span>;
const LocationIcon = () => <span className="text-primary">📍</span>;
const DoctorIcon = () => <span className="text-primary">👨‍⚕️</span>;
const UsersIcon = () => <span className="text-primary">👥</span>;

export default AvlCamps;
