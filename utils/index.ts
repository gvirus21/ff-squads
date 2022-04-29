export function shortenAddress(address: string | null | undefined, chars = 4): string {
  if (!address) {
    return '';
  }

  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
}
