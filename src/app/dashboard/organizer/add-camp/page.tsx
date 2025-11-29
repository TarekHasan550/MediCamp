// app/dashboard/organizer/add-camp/page.tsx
'use client';

import { Calendar, DollarSign, MapPin, Save, Upload, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CampFormData {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CampFormData>({
    defaultValues: {
      fees: 0,
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
    },
  });

  const onSubmit = async (data: CampFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Camp data:', data);
      // API call to save camp
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

      // Show success alert
      console.log('Camp created successfully!');
      reset();
      setImagePreview('');
    } catch (error) {
      console.error('Error creating camp:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Camp</h1>
        <p className="text-muted-foreground mt-2">
          Create a new medical camp and make it available for participants
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Image Upload */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Camp Image
            </h3>

            <div className="space-y-4">
              {/* Image Preview */}
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Camp preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setImagePreview('')}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full hover:bg-destructive/90 transition-colors"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <span className="text-foreground font-medium">
                    Upload Camp Image
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">
                    PNG, JPG up to 5MB
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}

              {/* Form Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  Tips for success:
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Use high-quality, relevant images</li>
                  <li>• Provide clear, detailed descriptions</li>
                  <li>• Set realistic participant capacity</li>
                  <li>• Include all necessary service details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Camp Form */}
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  Camp Name *
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: 'Camp name is required',
                    minLength: {
                      value: 5,
                      message: 'Camp name must be at least 5 characters',
                    },
                  })}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter camp name (e.g., Cardiology Health Camp)"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Camp Fees */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Camp Fees (BDT) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="number"
                    {...register('fees', {
                      required: 'Camp fees are required',
                      min: {
                        value: 0,
                        message: 'Fees cannot be negative',
                      },
                      max: {
                        value: 10000,
                        message: 'Fees seem too high',
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                  />
                </div>
                {errors.fees && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.fees.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="date"
                    {...register('date', {
                      required: 'Date is required',
                      validate: {
                        futureDate: (value) => {
                          const selectedDate = new Date(value);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return (
                            selectedDate >= today ||
                            'Date must be in the future'
                          );
                        },
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  {...register('time', {
                    required: 'Time is required',
                  })}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.time.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    {...register('location', {
                      required: 'Location is required',
                      minLength: {
                        value: 10,
                        message: 'Please provide a detailed location',
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter full address with landmarks"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Healthcare Professional */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Healthcare Professional *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    {...register('healthcareProfessional', {
                      required: 'Healthcare professional name is required',
                      minLength: {
                        value: 3,
                        message: 'Please provide full name',
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter doctor's name and qualification"
                  />
                </div>
                {errors.healthcareProfessional && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.healthcareProfessional.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 50,
                      message: 'Description must be at least 50 characters',
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Description must be less than 1000 characters',
                    },
                  })}
                  rows={6}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Provide detailed information about the camp, services offered, special instructions, etc."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground ml-auto">
                    {watch('description')?.length || 0}/1000 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 px-6 py-3 border border-input text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
              >
                Reset Form
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Creating Camp...
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
