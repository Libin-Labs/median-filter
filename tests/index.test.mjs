import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('impulse removal', () => {
  assert.deepEqual(api.medianFilter([1, 1, 99, 1, 1]), [1, 1, 1, 1, 1]);
});
test('clipped edge midpoint', () => {
  assert.deepEqual(api.medianFilter([1, 3, 5]), [2, 3, 4]);
});
test('window one', () => {
  assert.deepEqual(api.medianFilter([1, 4, 2], 1), [1, 4, 2]);
});
test('singleton', () => {
  assert.deepEqual(api.medianFilter([5], 101), [5]);
});
test('input preserved', () => {
  const a = [3, 2, 1];
  api.medianFilter(a);
  assert.deepEqual(a, [3, 2, 1]);
});
test('invalid windows', () => {
  assert.throws(() => api.medianFilter([1], 2));
  assert.throws(() => api.medianFilter([], 3));
  assert.throws(() => api.medianFilter([NaN]));
});
