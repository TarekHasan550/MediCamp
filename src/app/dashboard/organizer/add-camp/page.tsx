// app/dashboard/organizer/add-camp/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Calendar,
  DollarSign,
  MapPin,
  Save,
  Upload,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface CampFormData {
  name: string;
  image: string;
  fees: number;
  date: string;
  time: string;
  location: string;
  healthcareProfessional: string;
  description: string;
}

export default function AddCamp() {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileKey, setFileKey] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CampFormData>({
    defaultValues: {
      fees: 0,
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const res = await fetch('/api/upload/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type || 'image/jpeg',
        }),
      });

      if (!res.ok) throw new Error('Failed to get upload URL');

      const { presignedUrl, key } = await res.json();
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type || 'image/jpeg',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          }
        },
      });
      setValue('image', key);
      setFileKey(key);
    }
  };

  const removeImage = async () => {
    if (fileKey) {
      try {
        const res = await axios.delete('/api/upload/delete', {
          data: { fileKey },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
            }
          },
        });

        if (res.status === 200) {
          setImagePreview('');
          setUploadProgress(0);
          setValue('image', '');
        }
        console.log('Old image deleted from S3');
      } catch (err) {
        console.error('Failed to delete from S3:', err);
      }
    }
  };

  const onSubmit = async (data: CampFormData) => {
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Camp</h1>
        <p className="text-muted-foreground mt-2">
          Create a new medical camp and make it available for participants
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Image Upload */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Camp Image</h3>

            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Camp preview"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <Button
                    onClick={removeImage}
                    variant="destructive"
                    size="icon"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="h-5 w-5" />
                  </Button>

                  {/* Progress overlay */}
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center text-white">
                      <div className="text-lg font-medium mb-2">
                        Uploading... {uploadProgress}%
                      </div>
                      <div className="w-48 bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <label className="block border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-all">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <span className="text-foreground font-medium block text-lg">
                    Upload Camp Image
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <h4 className="font-semibold text-blue-900 mb-2">Tips:</h4>
                <ul className="text-blue-800 space-y-1 text-xs">
                  <li>• High-quality, clear images work best</li>
                  <li>• Show doctors, patients or medical setup</li>
                  <li>• Landscape orientation preferred</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form Fields */}
        <div className="lg:col-span-2">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-border rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camp Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Camp Name *
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: 'Camp name is required',
                    minLength: { value: 5, message: 'Minimum 5 characters' },
                  })}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., Free Diabetes Checkup Camp 2025"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Fees */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Fees (BDT) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="number"
                    {...register('fees', { required: 'Fees required', min: 0 })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-2">Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="date"
                    {...register('date', { required: 'Date required' })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium mb-2">Time *</label>
                <input
                  type="time"
                  {...register('time', { required: 'Time required' })}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-4 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    {...register('location', { required: 'Location required' })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Full address with area, Dhaka"
                  />
                </div>
              </div>

              {/* Healthcare Professional */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Doctor / Professional *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    {...register('healthcareProfessional', {
                      required: 'Required',
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Dr. Ahmed Hossain, Cardiologist"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description required',
                    minLength: { value: 50, message: 'Minimum 50 characters' },
                  })}
                  rows={6}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                  placeholder="Describe services, who can attend, what to bring..."
                />
                <div className="flex justify-between mt-1">
                  {errors.description && (
                    <p className="text-destructive text-sm">
                      {errors.description.message}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground ml-auto">
                    {watch('description')?.length || 0}/1000
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  reset();
                  removeImage();
                }}
                className="flex-1 px-6 py-3 border border-input rounded-lg hover:bg-muted font-medium"
              >
                Reset Form
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!imagePreview}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 font-medium flex items-center justify-center gap-2 disabled:opacity-50 relative"
              >
                {uploadProgress ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {uploadProgress > 0
                      ? `Uploading ${uploadProgress}%`
                      : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Camp
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
