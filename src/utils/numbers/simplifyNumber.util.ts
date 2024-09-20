/**
 * Output:
 * 950 => 950
 * 1234 => 1.2K
 * 15000 => 15K
 * 1500000 => 1.5M
 */
export function simplifyNumber(value: number): string {
	if (value < 1000) {
		return value.toString()
	} else if (value < 1_000_000) {
		return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
	} else {
		return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
	}
}
