import historyData from '../../data/history.json';
import type { DisclosureDimension, DisclosureStatus } from './providers';

export interface HistoryEntry {
  date: string;
  provider: string;
  dimension: DisclosureDimension;
  /** null when the provider was first tracked */
  from: DisclosureStatus | null;
  to: DisclosureStatus;
  source_url: string | null;
  note?: string;
}

export const history: HistoryEntry[] = historyData as HistoryEntry[];

/** Status changes only (excludes first-tracked entries), newest first. */
export const statusChanges: HistoryEntry[] = history
  .filter((e) => e.from !== null)
  .sort((a, b) => b.date.localeCompare(a.date));

export const changesFor = (providerId: string) =>
  statusChanges.filter((e) => e.provider === providerId);

export const firstTracked = (providerId: string) =>
  history
    .filter((e) => e.provider === providerId && e.from === null)
    .map((e) => e.date)
    .sort()[0];

/** Groups entries by date, keeping the input order within and across groups. */
export const groupByDate = (entries: HistoryEntry[]) => {
  const groups: { date: string; entries: HistoryEntry[] }[] = [];
  for (const e of entries) {
    const last = groups[groups.length - 1];
    if (last && last.date === e.date) last.entries.push(e);
    else groups.push({ date: e.date, entries: [e] });
  }
  return groups;
};
