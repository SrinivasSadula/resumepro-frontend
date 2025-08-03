export interface Resume {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
  }[];
}
export interface ResumeState {
  resume: Resume;
  premiumStatus: boolean;
}