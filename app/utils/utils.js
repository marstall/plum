export function paramsToQueryString(params) {
  if (!params) return '';
  return Object.entries(params).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value}`,
    ''
  );
}

export const clog = console.log;
