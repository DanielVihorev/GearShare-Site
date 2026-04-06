import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  CheckIcon,
} from "../../components/icons";
import { auth } from "../../lib/firebaseAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type AuthError,
} from "firebase/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function syncWithBackend(
  isLogin: boolean,
  data: { email: string; password: string; firstName?: string; lastName?: string }
) {
  try {
    if (isLogin) {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.accessToken) localStorage.setItem("gs_token", json.accessToken);
      }
    } else {
      const username =
        `${data.firstName ?? ""}${data.lastName ?? ""}`.toLowerCase().replace(/[^a-z0-9]/g, "") +
        Date.now().toString().slice(-4);
      await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          confirmPassword: data.password,
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          username,
        }),
      });
      // Log in immediately after register to get token
      const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (loginRes.ok) {
        const json = await loginRes.json();
        if (json.accessToken) localStorage.setItem("gs_token", json.accessToken);
      }
    }
  } catch {
    // Backend sync is best-effort — Firebase is the source of truth for auth
  }
}

// Define a type for our form data for better type safety
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const AuthForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
    setFormData(initialFormData);
    setErrors({});
  }, [location.pathname]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "success" }),
      5000
    );
  };

  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email address is invalid";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        break;
      case "firstName":
        if (!isLogin && !value) return "First name is required";
        break;
      case "lastName":
        if (!isLogin && !value) return "Last name is required";
        break;
      case "confirmPassword":
        if (!isLogin && value !== formData.password)
          return "Passwords do not match";
        break;
      default:
        break;
    }
    return "";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    const error = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: error || undefined }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showNotification("Please fix the errors below.", "error");
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Firebase Sign In Logic
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        await syncWithBackend(true, { email: formData.email, password: formData.password });
        showNotification("Login successful!", "success");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        // Firebase Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        // Update the new user's profile with their name
        await updateProfile(userCredential.user, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        });
        await syncWithBackend(false, {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        showNotification("Account created successfully!", "success");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      const authError = error as AuthError;
      let message = "An unknown error occurred.";
      switch (authError.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
        case "auth/invalid-email":
          message = "Invalid email or password.";
          // ADD THIS PART:
          setErrors({
            email: "Invalid email or password.",
            password: " ", // Add a space to trigger the error state without a message
          });
          break;
        // ... other cases
      }
      showNotification(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      {notification.show && (
        <div
          className={`fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notification.type === "success" ? (
            <CheckIcon className='w-6 h-6 text-white' />
          ) : (
            <AlertCircleIcon className='w-6 h-6 text-white' />
          )}
          <span className='text-white font-semibold'>
            {notification.message}
          </span>
        </div>
      )}

      <div className='bg-white/5 border border-white/20 rounded-2xl shadow-xl p-8 backdrop-blur-lg'>
        <h2 className='text-center text-3xl font-bold text-white mb-2'>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className='text-center text-white/70 mb-8'>
          {isLogin ? "Sign in to continue" : "Get started with GearShare"}
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {!isLogin && (
            <div className='flex flex-col md:flex-row gap-4'>
              <div>
                <label className='block text-sm font-medium text-white/90 mb-2'>
                  First Name
                </label>
                <div className='relative'>
                  <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50' />
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder='John'
                    required
                    className={`w-full bg-white/10 border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:outline-none transition ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-blue-400"
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className='mt-1 text-sm text-red-400'>
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-white/90 mb-2'>
                  Last Name
                </label>
                <div className='relative'>
                  <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50' />
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder='Doe'
                    required
                    className={`w-full bg-white/10 border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:outline-none transition ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-blue-400"
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className='mt-1 text-sm text-red-400'>{errors.lastName}</p>
                )}
              </div>
            </div>
          )}
          <div>
            <label className='block text-sm font-medium text-white/90 mb-2'>
              Email Address
            </label>
            <div className='relative'>
              <MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50' />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder='you@example.com'
                required
                className={`w-full bg-white/10 border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:outline-none transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-blue-400"
                }`}
              />
            </div>
            {errors.email && (
              <p className='mt-1 text-sm text-red-400'>{errors.email}</p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-white/90 mb-2'>
              Password
            </label>
            <div className='relative'>
              <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50' />
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder='••••••••'
                required
                className={`w-full bg-white/10 border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:outline-none transition ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-blue-400"
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white'
              >
                {showPassword ? (
                  <EyeOffIcon className='h-5 w-5' />
                ) : (
                  <EyeIcon className='h-5 w-5' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='mt-1 text-sm text-red-400'>{errors.password}</p>
            )}
          </div>
          {!isLogin && (
            <div>
              <label className='block text-sm font-medium text-white/90 mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50' />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder='••••••••'
                  required
                  className={`w-full bg-white/10 border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:outline-none transition ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/20 focus:ring-blue-400"
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white'
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className='h-5 w-5' />
                  ) : (
                    <EyeIcon className='h-5 w-5' />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}
          <div className='pt-2'>
            <Button
              type='submit'
              variant='primary'
              className='w-full justify-center text-base py-3'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-sm text-white/70'>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/register" : "/login"}
              className='font-medium text-blue-400 hover:text-blue-300'
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
