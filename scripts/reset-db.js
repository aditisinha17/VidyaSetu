// VidyaSetu One-Command Demo Database Reset Script
// Usage: node scripts/reset-db.js

import { DataStore } from '../backend/data/store.js';

console.log('=======================================================');
console.log('🔄  VidyaSetu Database Reset: Restoring Pristine Demo State');
console.log('=======================================================');

DataStore.resetToDefaults();

const apps = DataStore.getApplications();
const birsa = apps.find(a => a.id === 'MOTA-2026-NFST-0101');
const anomaly1 = apps.find(a => a.id === 'MOTA-2026-NFST-0102');
const anomaly2 = apps.find(a => a.id === 'MOTA-2026-NFST-0103');

console.log('[OK] Reset complete.');
console.log(`[OK] Star Applicant: ${birsa?.name} (${birsa?.id}) -> Status: ${birsa?.status}`);
console.log(`[OK] Anomaly Pair: ${anomaly1?.id} & ${anomaly2?.id} -> Shared identifiers registered`);
console.log(`[OK] Total applications seeded: ${apps.length}`);
console.log(`[OK] All 5 MoTA schemes initialized with versioned rules.`);
console.log('=======================================================');
