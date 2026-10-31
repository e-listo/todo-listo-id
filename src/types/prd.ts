export type PriorityLevel = 'P0' | 'P1' | 'P2';

export interface FeatureItem {
  id: string;
  title: string;
  priority: PriorityLevel;
  description: string;
  userStory?: string;
  acceptanceCriteria: string[];
}

export interface TechStackConfig {
  frontend: string;
  styling: string;
  backend: string;
  database: string;
  auth: string;
  stateManagement: string;
  thirdPartyApis: string[];
}

export interface NonFunctionalReq {
  id: string;
  category: 'Performance' | 'Security' | 'UX/Accessibility' | 'Reliability';
  requirement: string;
  metric: string;
}

export interface EntityField {
  name: string;
  type: string;
  isRequired: boolean;
  description: string;
}

export interface DataEntity {
  id: string;
  entityName: string;
  description: string;
  fields: EntityField[];
}

export interface EdgeCaseScenario {
  id: string;
  scenario: string;
  expectedBehavior: string;
  fallbackOrRecovery: string;
}

export interface SuccessMetric {
  id: string;
  metric: string;
  targetGoal: string;
}

export type TargetAiModel =
  | 'gemini-3.8-flash'
  | 'claude-3-7-sonnet'
  | 'gpt-4o'
  | 'cursor-windsurf'
  | 'deepseek-r1';

export type PromptStyle =
  | 'xml_mega_prompt'
  | 'cursor_rules'
  | 'phased_sprints'
  | 'senior_architect_rfc';

export interface PRDDocument {
  id: string;
  appName: string;
  tagline: string;
  category: string;
  version: string;
  deployUrl?: string;
  targetAudience: string;
  problemStatement: string;
  valueProposition: string;
  coreFeatures: FeatureItem[];
  outOfScope: string[];
  techStack: TechStackConfig;
  nonFunctional: NonFunctionalReq[];
  dataModels: DataEntity[];
  edgeCases: EdgeCaseScenario[];
  successMetrics: SuccessMetric[];
  aiPromptSettings: {
    targetModel: TargetAiModel;
    promptStyle: PromptStyle;
    includeAntiPatterns: boolean;
    includeXmlTags: boolean;
    emphasizeVerification: boolean;
    language: 'id' | 'en';
  };
  createdAt: string;
  updatedAt: string;
}
