import axios from 'axios';
import { FormData } from '@/types/form';

export const webhookSubmit = async (formData: FormData): Promise<void> => {
  const payload = {
    name: formData.name || '',
    age: formData.age,
    gender: formData.gender,
    weight: {
      value: formData.weight?.value,
      unit: formData.weight?.unit
    },
    height: {
      value: formData.height?.value,
      unit: formData.height?.unit
    },
    activity_level: formData.activity_level,
    diet_type: formData.diet_type,
    allergies: formData.allergies,
    exercise_preference: formData.exercise_preference,
    equipment: formData.equipment,
    goal: formData.goal,
    timeframe: formData.timeframe,
    consent: formData.consent,
    timestamp: new Date().toISOString()
  };

  const response = await axios.post(
    'https://internally-ready-shark.ngrok-free.app/webhook-test/nutrition',
    payload,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    }
  );

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Server responded with status ${response.status}`)
  }
}

export const submitToWebhook = async (
  formData: FormData, 
  selectedPlan: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const payload = {
      name: formData.name || '',
      age: formData.age,
      gender: formData.gender,
      weight: {
        value: formData.weight.value,
        unit: formData.weight.unit
      },
      height: {
        value: formData.height.value,
        unit: formData.height.unit
      },
      activity_level: formData.activity_level,
      diet_type: formData.diet_type,
      allergies: formData.allergies,
      exercise_preference: formData.exercise_preference,
      equipment: formData.equipment,
      goal: formData.goal,
      timeframe: formData.timeframe,
      pricing_plan_selected: selectedPlan,
      consent: formData.consent,
      timestamp: new Date().toISOString()
    };

    const response = await axios.post(
      'https://internally-ready-shark.ngrok-free.app/webhook-test/nutrition',
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return { success: true };
    } else {
      return { success: false, error: `Server responded with status ${response.status}` };
    }
  } catch (error) {
    console.error('Webhook submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};