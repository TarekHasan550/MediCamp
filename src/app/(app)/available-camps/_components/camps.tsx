'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';
import useAvailableCamps from '@/hooks/use-avaliable-camps';
import {
  AlertCircleIcon,
  DatabaseZapIcon,
  Filter,
  Grid2X2,
  Grid3X3,
  Search,
  X,
} from 'lucide-react';
import { useState } from 'react';
import HealthCampCard from './camp-card';

interface Camp {
  _id: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'participantCount' | 'fees' | ''>(''); // ✅ Match backend
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1); // ✅ Add page state

  // ✅ Pass all query params
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useAvailableCamps({
    search: searchQuery,
    sort: sortBy,
    page: page,
    limit: 6,
  });

  if (isError) {
    return (
      <div className="bg-background justify-center items-center flex">
        <Alert variant="destructive" className="max-w-7xl mt-5">
          <AlertCircleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-16.5rem)] bg-background">
      {isLoading ? (
        <div className="flex items-center justify-center bg-black/5 relative min-h-[60vh]">
          <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10" />
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Available Medical Camps
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover all our upcoming medical camps and find the perfect one
              for your needs
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search camps by name..."
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1); // ✅ Reset to page 1 on search
                  }}
                />
                {searchQuery && (
                  <Button
                    size={'icon-sm'}
                    variant="ghost"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => {
                      setSearchQuery('');
                      setPage(1);
                    }}
                  >
                    <X />
                  </Button>
                )}
              </div>

              {/* Sort and Layout Controls */}
              <div className="flex items-center gap-4 w-full lg:w-auto">
                {/* Sort Dropdown */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <select
                    className="pl-10 pr-8 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as any);
                      setPage(1); // ✅ Reset to page 1 on sort change
                    }}
                  >
                    <option value="">Most Recent</option>
                    <option value="participantCount">Most Registered</option>
                    <option value="fees">Camp Fees</option>
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
          {data.length > 0 && (
            <div className="text-muted-foreground text-lg mb-4">
              Showing {data.length} camps
            </div>
          )}

          {/* Camps Grid/List */}
          <div
            className={
              layout === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'grid grid-cols-1 gap-6'
            }
          >
            {data?.map((camp: Camp, idx: number) => (
              <HealthCampCard camp={camp} layout={layout} key={idx} />
            ))}
          </div>

          {/* No Results */}
          {data?.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <DatabaseZapIcon className="text-red-600" />
                </EmptyMedia>
                <EmptyTitle>No camps found</EmptyTitle>
                <EmptyDescription>
                  Try adjusting your search or filters
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </main>
      )}
    </div>
  );
};

export default AvlCamps;
