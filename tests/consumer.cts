import { medianFilter } from '@lp-labs/median-filter';
if (medianFilter([1, 1, 99, 1, 1])[2] !== 1) throw new Error('Median');
// @ts-expect-error invalid argument must be rejected by declarations
medianFilter(['1']);
