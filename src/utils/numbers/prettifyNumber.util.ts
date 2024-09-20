/**
 * Output:
 * 1000 => 1,000
 * 987654321 => 987,654,321
 * 1234567890 => 1,234,567,890
 */
export function prettifyNumber(value: number): string {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
