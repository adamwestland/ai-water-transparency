import { providers } from './providers';
import { DISCLOSURE_LABELS, DISCLOSURE_ORDER } from './disclosure-labels';

// schema.org JSON-LD for search engines. Describes the site and dataset only:
// no ratings, no per-provider judgments, same as the rest of the site.

export const SITE_URL = 'https://waterlens.ai';
const REPO_URL = 'https://github.com/adamwestland/ai-water-transparency';
const DATA_LICENSE = 'https://creativecommons.org/licenses/by/4.0/';

const lastUpdated = providers.map((p) => p.last_updated).sort().reverse()[0];

const publisher = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'waterlens',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  sameAs: [REPO_URL],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'AI Water Transparency Report',
  alternateName: 'waterlens',
  url: `${SITE_URL}/`,
  description:
    'What do AI companies disclose about water usage? An open-source, sourced comparison.',
  inLanguage: 'en',
  publisher,
};

export const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  '@id': `${SITE_URL}/data/#dataset`,
  name: 'AI Water Transparency Report dataset',
  description:
    `Disclosure status (yes, partial or no) for ${providers.length} AI providers across five ` +
    'dimensions of environmental transparency: water usage, energy usage, per-facility data, ' +
    'AI-specific data and water pledges. Every yes or partial links to the published source ' +
    'document it is based on.',
  url: `${SITE_URL}/data/`,
  sameAs: `${REPO_URL}/blob/main/data/providers.json`,
  license: DATA_LICENSE,
  isAccessibleForFree: true,
  creator: publisher,
  publisher,
  dateModified: lastUpdated,
  keywords: [
    'AI',
    'water usage',
    'data centers',
    'environmental disclosure',
    'sustainability reporting',
  ],
  variableMeasured: DISCLOSURE_ORDER.map((d) => DISCLOSURE_LABELS[d]),
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: `${SITE_URL}/data/providers.json`,
    },
  ],
};
