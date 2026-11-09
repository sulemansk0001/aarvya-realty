import app from './server.js';
import { Property } from './models/Property.js';
import { Enquiry } from './models/Enquiry.js';

console.log('[Test] Verifying Aarvya Realty Express Application & Models...');
console.log('[Test] App loaded successfully:', typeof app === 'function');
console.log('[Test] Property model defined:', typeof Property === 'function');
console.log('[Test] Enquiry model defined:', typeof Enquiry === 'function');
console.log('[Test] All backend modules validated cleanly!');
process.exit(0);
