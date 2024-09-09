import React from "react";

export type ButtonProps = {
  children: React.ReactNode;
  color: "primary" | "secondary";
  roundness: "sm-rounded" | "rounded";

  classNames?: string;
  style?: React.CSSProperties;
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
  companyName: string;
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
  discussionForumDescription: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type ReviewItemProps = {
  internName: string;
  date: string;
  rating: string; //not sure kasi number to eh?
  reviewDescription: string;

  classNames?: string;
  style?: React.CSSProperties;
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
  required: true | false;
  value?: string;
  extraProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export type NotificationItemProps = {
  notificationHeader: string;
  notificationDescription: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type AnnouncementItemProps = {
  announcementHeader: string;
  announcementDescription: string;
  date: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type CompanyOverviewDescriptionItemProps = {
  companyDescription: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type CompanyLocationItemProps = {
  location: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type CompanyJobInformationFormItemProps = {
  jobTitle: string;
  tags: string;
  jobDescription: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type AdminCreatennouncementItemProps = {
  subject: string;
  detail: string;

  classNames?: string;
  style?: React.CSSProperties;
};
