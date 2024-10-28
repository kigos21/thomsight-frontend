import React, { CSSProperties } from "react";
import { Company } from "./types";

export type ButtonProps = {
  children: React.ReactNode;
  color: "primary" | "secondary" | "black" | "gray";
  roundness: "sm-rounded" | "rounded";

  classNames?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: string;
  disabled?: boolean;
};

export type ButtonReviewProps = {
  children: React.ReactNode;
  classNames?: string;
};

export type StyledBoxProps = {
  children: React.ReactNode;
  bgColor?: string;
  border?: string;
  paddedContainerClass?: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type JobItemProps = {
  jobTitle: string;
  companyName: string | undefined;
  jobDescription: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type InterviewTipsItemProps = {
  subjectHeading: string;
  internName: string;
  tipDescription: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type DiscussionForumItemProps = {
  internName: string;
  date: string;
  description: string;
  onDescriptionChange: (updatedDescription: string) => void;

  classNames?: string;
  style?: React.CSSProperties;
};

export type ReviewItemProps = {
  internName: string | undefined;
  date: string | number | Date | undefined;
  rating: string; //not sure kasi number to eh?
  reviewDescription: string;
  onReviewChange: (updatedReview: {
    rating: string;
    description: string;
  }) => void;

  classNames?: string;
  style?: React.CSSProperties;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  id: number | undefined;
  posted_by: string | undefined;
};

export type PaddedContainerProps = {
  children: React.ReactNode;

  classNames?: string;
  style?: React.CSSProperties;
};

export type FormFieldProps = {
  icon?: JSX.Element;
  editIcon?: JSX.Element;
  classNames?: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  name?: string;
  required?: true | false;
  value?: string | number | null | undefined;
  extraProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export type TokenFormFieldProps = {
  icon?: JSX.Element;
  editIcon?: JSX.Element;
  classNames?: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  required: boolean; // Simplified to boolean
  extraProps?: React.InputHTMLAttributes<HTMLInputElement>;
  readOnly?: boolean; // Ensure this prop is optional
  initialEmail?: string | null;
  tokenId?: number;
};

export type TokenItemProps = {
  id: number;
  number: number; // Number to display
  token: string; // Token string to display
  email: string | null;
  onDeleteToken: (tokenId: number) => void;
  resetDeleteSuccess: () => void;
};

export type CompanyAccountsItemProps = {
  token: string; // Token string to display
  expiration: string; // Token string to display
  status: "active" | "inactive" | "expiring";
  classNames?: string; // Optional classNames prop
};

export type StatusProps = {
  status: "active" | "inactive" | "expiring";
  classNames?: string; // Optional classNames prop
};

export interface SortButtonProps {
  onSort: (sortOption: string) => void;
}

export interface AdminCreatennouncementItemProps {
  classNames?: string;
  style?: CSSProperties;
  subject: string;
  details: string;
}

export interface DeletePopUpProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete?: () => void;
  heading?: string;
  details?: string;
}

export interface ReportFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export type HomeCompanyItemProps = {
  company: Company;
};

export interface DismissPopUpProps {
  isVisible: boolean;
  onClose: () => void;
  onDismiss: () => void;
  heading: string;
  details: string;
}

export interface DisplayProfileProps {
  isVisible: boolean;
  onClose: () => void;
  firstName: string;
  lastName: string;
  bio: string;
  profileLink: string;
  phoneNumber: string;
  email: string;
}
