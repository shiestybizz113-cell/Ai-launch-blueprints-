export interface GPTPrompt {
  id: string;
  title: string;
  category: string;
  useCase: string;
  prompt: string;
  optionalUpgrade?: string;
  tags: string[];
  tier: 'free' | 'pro';
}
