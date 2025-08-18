export interface FormData {
  name?: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'na';
  weight: { value: number; unit: 'kg' | 'lb' };
  height: { value: number; unit: 'cm' | 'ftin' };
  activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | 'athlete';
  diet_type: 'standard' | 'vegetarian' | 'vegan' | 'keto' | 'paleo' | 'mediterranean';
  allergies: string[];
  exercise_preference?: 'gym' | 'home' | 'outdoor' | 'mix';
  equipment?: 'none' | 'basic' | 'full_gym';
  goal: 'lose' | 'gain' | 'maintain';
  timeframe: '4w' | '8w' | '12w';
  consent: boolean;
}

export interface PricingPlan {
  label: string;
  price: number;
  period: string;
  id: string;
}

export interface WeightData {
  value: number;
  unit: 'kg' | 'lb';
}

export interface HeightData {
  value: number;
  unit: 'cm' | 'ftin';
}