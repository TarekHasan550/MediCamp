'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ImageExtract from '@/lib/image-extract';
import {
  Calendar,
  ChevronRight,
  DollarSign,
  IndianRupee,
  MapPin,
  Stethoscope,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Camp {
  _id: string;
  name: string;
  image: string;
  fees: number;
  date: string;
  location: string;
  professional?: string;
  participants?: number;
  description: string;
}

export default function HealthCampCard({
  camp,
  layout,
}: {
  camp?: Camp;
  layout: 'grid' | 'list';
}) {
  const router = useRouter();
  if (!camp) {
    return null;
  }
  // const { data: image, isLoading } = useLoadImg(camp.image);
  const formattedDate = new Date(camp.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const img = ImageExtract(camp.image);

  return layout === 'grid' ? (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 border-0 shadow-sm pt-0">
      {/* Image Section */}
      <div className="relative h-42 w-full">
        <Image
          src={img as string}
          alt={camp.name}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* Top Badge */}
        <Badge className="absolute top-4 left-4 bg-emerald-600 text-white border-0 px-3 py-1">
          <Stethoscope className="w-3.5 h-3.5 mr-1" />
          Cardiology
        </Badge>

        {/* Fee Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge
            variant="secondary"
            className="bg-white/95 text-emerald-700 font-semibold text-sm backdrop-blur-sm"
          >
            <DollarSign className="w-6 h-6 -ml-1" />
            {camp.fees === 0 ? 'FREE' : camp.fees}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-bold text-gray-800 leading-tight">
            {camp.name}
          </CardTitle>
        </div>
        <CardDescription className="text-base text-gray-600">
          {camp.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Doctor Info */}
        <div className="flex items-center gap-3 text-gray-700">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Led by</p>
            <p className="font-semibold text-emerald-700">
              {camp.professional}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{camp.location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>{camp.participants} participants registered</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          onClick={() => router.push(`/camp-details/${camp._id}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <div
      onClick={() => router.push(`/camp-details/${camp._id}`)}
      className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-all cursor-pointer group"
    >
      {/* Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <Image
          src={img as string}
          alt={camp.name}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg text-foreground truncate">
          {camp.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {camp.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="truncate max-w-48">{camp.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="flex items-center gap-1">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            Dr. {camp.professional?.split(' ')[1] || camp.professional}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-emerald-600" />
            {camp.participants} joined
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <Badge
          variant={camp.fees === 0 ? 'default' : 'secondary'}
          className={camp.fees === 0 ? 'bg-emerald-600' : ''}
        >
          <IndianRupee className="w-4 h-4" />
          {camp.fees === 0 ? 'FREE' : camp.fees}
        </Badge>

        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </div>
  );
}
