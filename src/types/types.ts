export type User = {
  id: number;
  email: string;
  name: string;
  email_verified_at?: string;
  role: UserRole;
  bio?: string;
  status: UserStatus;
  phone_number?: string;
  company?: Company | undefined;
};

export enum UserRole {
  ADMIN = "Admin",
  STUDENT = "Student",
  REP = "Rep",
  ALUMNI = "Alumni",
}

export enum UserStatus {
  EXISTING = "Existing",
  DEACTIVATED = "Deactivated",
}

export type Company = {
  id?: number;
  name?: string;
  posted_by?: number;
  description?: string;
  industry?: string;
  size?: string;
  email?: string;
  slug?: string;
  locations?: Location[];
  jobs?: Job[];
  image?: string;
  deleted_at?: Date | null;
};

export type Location = {
  id: number;
  company_id: number;
  address: string;
};

export type Job = {
  id: number;
  company_id: number | undefined;
  title: string;
  description: string;
};

export type Announcement = {
  id: number;
  title: string;
  content: string;
  updated_at: Date;
};

export type FeedbackReport = {
  id: number;
  poster_name: string;
  posted_date: string;
  rating: number;
  review: string;
  reporter_name: string;
  report_date: string;
  reason: string;
  feedback_id: number;
  issue: string;
};

export type DiscussionReport = {
  id: number;
  poster_name: string;
  posted_date: string;
  description: string;
  reporter_name: string;
  report_date: string;
  reason: string;
  discussion_id: number;
  issue: string;
};

export type TipReport = {
  id: number;
  poster_name: string;
  posted_date: string;
  title: string;
  content: string;
  reporter_name: string;
  report_date: string;
  reason: string;
  tip_id: number;
  issue: string;
};

export type CV = {
  id: number;
  name: string;
  user_id: number;
  description: string;
  file: string;
};
