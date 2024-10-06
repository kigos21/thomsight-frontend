export type User = {
  id: number;
  email: string;
  name: string;
  email_verified_at?: string;
  role: UserRole;
  profile_info?: string;
  status: UserStatus;
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
  id: number;
  name: string;
  posted_by: number;
  description?: string;
  industry?: string;
  size?: string;
  email: string;
  slug: string;
  locations?: Location[];
  jobs?: Job[];
  image?: string;
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
