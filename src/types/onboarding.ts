// src/types/onboarding.ts

export type OnboardingScene = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface OnboardingData {
  identity: {
    name: string;
    role: string;
    pronoun: string;
    age: number;
    avatar_url?: string;
  };
  nexus: {
    workspace_name: string;
    organization: string;
  };
  spectrum: {
    theme: 'light' | 'dark' | 'system';
    accent: string;
  };
  intelligence: {
    focus: 'creator' | 'developer' | 'studio' | 'startup' | 'enterprise' | 'personal';
  };
}