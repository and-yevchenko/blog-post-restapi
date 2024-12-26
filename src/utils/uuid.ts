export const uuid = (n: number): string => {
    if (n <= 0 || !Number.isInteger(n)) {
      throw new Error("Parameter 'n' must be a positive integer.");
    }
  
    return '10000000-1000-4000-8000-100000000000'
      .replace(/[018]/g, (c: string) =>
        ((+c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
      )
      .slice(0, n);
  };
  