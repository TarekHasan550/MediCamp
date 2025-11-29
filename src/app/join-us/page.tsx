// app/join-us/page.tsx
'use client';

import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/navbar/Navbar';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'participant' | 'organizer';
}

const JoinUs = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React Hook Form for Login
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginForm>();

  // React Hook Form for Register
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    watch,
    reset: resetRegister,
  } = useForm<RegisterForm>();

  const watchPassword = watch?.('password');

  const onLoginSubmit = (data: LoginForm) => {
    console.log('Login data:', data);
    // Handle login logic here
    // Show sweet alert on success
  };

  const onRegisterSubmit = (data: RegisterForm) => {
    console.log('Register data:', data);
    // Handle registration logic here
    // Show sweet alert on success
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetLogin();
    resetRegister();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'Welcome Back' : 'Join MediCamp'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? 'Sign in to your account'
                : 'Create your account to get started'}
            </p>
          </div>

          {/* Social Login */}
          <div className="mb-6 flex flex-col gap-2">
            <button className="w-full flex items-center justify-center gap-3 bg-card border border-input text-foreground px-4 py-3 rounded-lg hover:bg-accent transition-colors font-medium cursor-pointer">
              <FcGoogle />
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-card border border-input text-foreground px-4 py-3 rounded-lg hover:bg-accent transition-colors font-medium cursor-pointer">
              <FaGithub />
              Continue with Github
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Forms */}
          {isLogin ? (
            /* Login Form */
            <motion.form
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleLoginSubmit(onLoginSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="email"
                    {...loginRegister('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                  />
                </div>
                {loginErrors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {loginErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...loginRegister('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className="w-full pl-10 pr-12 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="mt-1 text-sm text-destructive">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <User className="h-4 w-4" />
                Sign In
              </motion.button>
            </motion.form>
          ) : (
            /* Register Form */
            <motion.form
              key="register-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleRegisterSubmit(onRegisterSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    {...registerRegister('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                </div>
                {registerErrors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {registerErrors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="email"
                    {...registerRegister('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                  />
                </div>
                {registerErrors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {registerErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Account Type
                </label>
                <select
                  {...registerRegister('role', {
                    required: 'Please select account type',
                  })}
                  className="w-full px-3 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select account type</option>
                  <option value="participant">Participant</option>
                  <option value="organizer">Organizer</option>
                </select>
                {registerErrors.role && (
                  <p className="mt-1 text-sm text-destructive">
                    {registerErrors.role.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...registerRegister('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className="w-full pl-10 pr-12 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {registerErrors.password && (
                  <p className="mt-1 text-sm text-destructive">
                    {registerErrors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...registerRegister('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === watchPassword || 'Passwords do not match',
                    })}
                    className="w-full pl-10 pr-12 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {registerErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-destructive">
                    {registerErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Create Account
              </motion.button>
            </motion.form>
          )}

          {/* Toggle Mode */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={toggleMode}
                className="text-primary hover:text-primary/90 font-semibold transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JoinUs;
