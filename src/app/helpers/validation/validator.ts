/**
 * Validate every sync and async conditions
 *
 * @returns boolean
 */
export const validator = async (conditions: Promise<boolean>[]): Promise<boolean> => {
  const results = await Promise.all(conditions);
  return results.every((e) => e);
};
