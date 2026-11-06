function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function sample(values: readonly number[], max = 2048): void {
  if (!Array.isArray(values) || !values.length || values.length > max)
    throw new RangeError('Nonempty bounded sample required');
  for (const v of values) finite(v, -1e6, 1e6);
}
export function medianFilter(values: readonly number[], window = 3): number[] {
  sample(values, 100000);
  integer(window, 1, 101);
  if (window % 2 === 0) throw new RangeError('Odd window required');
  const half = Math.floor(window / 2);
  return values.map((_, i) => {
    const a = values
        .slice(Math.max(0, i - half), Math.min(values.length, i + half + 1))
        .sort((x, y) => x - y),
      m = Math.floor(a.length / 2);
    return a.length % 2 ? a[m]! : (a[m - 1]! + a[m]!) / 2;
  });
}
