/**
 * A learner's Knovate ID: 8 characters derived from their account id, so it is
 * the same on every device and needs no extra storage. Uses an alphabet with
 * no look-alikes (no 0/O, 1/I), like credential IDs.
 *
 * 8 characters carry 40 bits of the UUID — unique enough to quote to support
 * or a recruiter; the account id stays the real key.
 */
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 32 symbols, as in credential IDs

export function knovateId(userId: string | undefined | null): string {
  const hex = (userId || '').replace(/[^0-9a-f]/gi, '').slice(0, 10);
  if (hex.length < 10) return '';
  let n = BigInt('0x' + hex);
  let out = '';
  for (let i = 0; i < 8; i++) {
    out = ALPHABET[Number(n & 31n)] + out;
    n >>= 5n;
  }
  return out;
}
