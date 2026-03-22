import providersData from '../../data/providers.json';

export type DisclosureStatus = 'yes' | 'no' | 'partial';

export interface DisclosureItem {
  status: DisclosureStatus;
  detail: string;
  source_url: string | null;
}

export type DisclosureDimension =
  | 'water_usage'
  | 'energy_usage'
  | 'per_facility_reporting'
  | 'ai_specific_data'
  | 'water_pledge';

export interface Provider {
  id: string;
  name: string;
  sustainability_report_url: string | null;
  disclosures: Record<DisclosureDimension, DisclosureItem>;
  last_updated: string;
}

export const providers: Provider[] = providersData as Provider[];
