export const parseNumber = (maybeNumber: unknown): number => {
  if (typeof maybeNumber === 'number') {
    return Number.isFinite(maybeNumber) ? maybeNumber : Number.NaN;
  }

  if (typeof maybeNumber === 'string') {
    const trimmed = maybeNumber.trim();
    if (trimmed === '') return Number.NaN;

    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : Number.NaN;
  }

  return Number.NaN;
};
