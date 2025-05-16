import { StatusType } from "@/lib/constants";
import { ElementType, ReactNode } from "react";

// export type ProfileTabName = 'Compliance' | 'Reviews' | 'Bookings' | 'Referrals' | 'Payments' | 'Notifications' | 'Subscriptions' | 'Community' | 'Traces'
export type TTabs<T> = Map<T, ElementType>;

export interface IMerchant {
  id: string;
  username: string | null;
  email: string;
  secondaryEmail: string | null;
  password: string;
  googleId: string | null;
  profilePhoto: string | null;
  role: string;
  emailVerified: boolean;
  // accountVerified: boolean;
  phoneNumber: string | null;
  address: string | null;
  countryRegion: string | null;
  instagramURL: string | null;
  facebookURL: string | null;
  tiktokURL: string | null;
  twitterURL: string | null;
  twoFactorEnabled: boolean;
  avgRating: number | null;
  totalBookings: number | null;
  status: StatusType;
  biodata: IBiodata;
  createdAt: string;
  updatedAt: string;
  subscriptionPlanId: string | null;
}

export interface IOtherDetails {
  id: string;
  profession: string;
  about: string;
  drive: boolean;
  createdAt: string;
  updatedAt: string;
  languagesSpoken: string[];
  relatedPhotos: string[];
  biodataId: string;
}

export interface IBiodata {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  merchantId: string;
  otherDetails: IOtherDetails;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  noOfStars: number;
  note: string;
  taskType: string;
  productImages: string[];
  serviceId: string;
  reviewerId: string;
  createdAt: string;
  updatedAt: string;
  service: IService;
  reviewer: IMerchant;
}

export interface IService {
  id: string;
  title: string;
  tasks: string[];
  gender: string;
  standardHourlyRate: number;
  discountedRate: number;
  createdAt: string;
  updatedAt: string;
  status: StatusType;
  merchantId: string;
}

export interface IBooking {
  id: string;
  status: StatusType;
  note: string | null;
  serviceId: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  service: IService;
  customer: IMerchant;
}

export interface ITasker {
  id: string;
  status: StatusType;
  note: string | null;
  name: string;
  bookings: string;
  rating: string;
  country: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  customer: IMerchant;
  serviceId: string;
}
export interface IFlag {
  id: string;
  endpoint: string;
  Last14days: number;
  Last30days: number;
  Last60days: number;
  status: StatusType;
  note: string | null;
  name: string;
  bookings: string;
  rating: string;
  country: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  customer: IMerchant;
  serviceId: string;
}

export interface IKYC {
  id: string;
  docType: string;
  expiryDate: string;
  files: {
    name: string;
    doc: string;
  }[];
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskerTitle {
  id: string;
  status: StatusType;
  title: string;
  specialties: string;
  createdAt: string;
  updatedAt: string;
}


export interface IVehicle {
  id: string;
  status: StatusType;
  vehicle: string;
  createdAt: string;
  updatedAt: string;
}


export interface ICountries {
  id: string;
  status: StatusType;
  city: string;
  country: ICountry;
  createdAt: string;
  updatedAt: string;
}

export interface ICountry {
  name: string;
  image: string;
}

export interface ISeeker {
  id: string;
  status: StatusType;
  note: string | null;
  name: string;
  bookings: string;
  rating: string;
  country: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  customer: IMerchant;
  serviceId: string;
}

export interface ISubscription {
  id: string;
  status: StatusType;
  plan: {
    type: string;
    duration: string;
    amount: number;
    startAt: string;
    endAt: string;
  };
  customerId: string;
  createdAt: string;
  updatedAt: string;
  customer: IMerchant;
}


export interface INews {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}


export interface IUser {
  id: string;
  name: string;
  email: string;
  amount: string;
  role: string;
  phone: string;
  country: string;
  status: StatusType;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDisher {
  id: string;
  title: string;
  message: string;
  method: string;
  schedule: string;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}


export interface IVerificationRequest {
  id: string;
  status: StatusType;
  note: string | null;
  name: string;
  reference: string;
  // rating: string;
  country: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  customer: IMerchant;
  serviceId: string;
}

export interface IWithdrawal {
  id: string;
  status: StatusType;
  note: string | null;
  name: string;
  reference: string;
  // rating: string;
  country: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  customer: IMerchant;
  serviceId: string;
}

export interface IRole {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  id: string;
  title: string;
  category: string;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
  content: string;
  featuredImage: string;
  galleryImage: string;
}