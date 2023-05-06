import { generateReportData, storeData } from './data.js';
import log from './util/logger.js';

const data = generateReportData(log);
storeData(data);
