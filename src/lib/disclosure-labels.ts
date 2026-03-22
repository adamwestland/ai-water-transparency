import type { DisclosureDimension } from './providers';

export const DISCLOSURE_LABELS: Record<DisclosureDimension, string> = {
  water_usage: 'Water Usage',
  energy_usage: 'Energy Usage',
  per_facility_reporting: 'Per-Facility Data',
  ai_specific_data: 'AI-Specific Data',
  water_pledge: 'Water Pledge',
};

export const DISCLOSURE_ORDER: DisclosureDimension[] = [
  'water_usage',
  'energy_usage',
  'per_facility_reporting',
  'ai_specific_data',
  'water_pledge',
];
