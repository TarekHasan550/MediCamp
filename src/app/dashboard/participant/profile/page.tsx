// app/dashboard/participant/profile/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Camera, Mail, Phone, Save, User, Users } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  emergencyContact: string;
  image?: string;
}

export default function ParticipantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    '/images/default-avatar.jpg'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileForm>({
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+880 1234-567890',
      age: 28,
      gender: 'male',
      emergencyContact: '+880 9876-543210',
    },
  });

  const onSubmit = (data: ProfileForm) => {
    console.log('Profile updated:', data);
    setIsEditing(false);
    // Show sweet alert on success
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
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
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Image & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Image */}
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-border"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <h2 className="text-xl font-semibold text-foreground mt-4">
              {watch('name')}
            </h2>
            <p className="text-muted-foreground">{watch('email')}</p>

            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Edit Profile
              </motion.button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Account Overview
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined</span>
                </div>
                <span className="text-foreground font-medium">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Camps Registered</span>
                </div>
                <span className="text-foreground font-medium">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-border rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?[\d\s-]+$/,
                        message: 'Invalid phone number',
                      },
                    })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="number"
                    {...register('age', {
                      required: 'Age is required',
                      min: { value: 1, message: 'Age must be positive' },
                      max: { value: 120, message: 'Age must be reasonable' },
                    })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>
                {errors.age && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Gender
                </label>
                <select
                  {...register('gender', {
                    required: 'Gender is required',
                  })}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Emergency Contact
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="tel"
                    {...register('emergencyContact', {
                      required: 'Emergency contact is required',
                      pattern: {
                        value: /^\+?[\d\s-]+$/,
                        message: 'Invalid phone number',
                      },
                    })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>
                {errors.emergencyContact && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border border-input text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </motion.button>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
}
