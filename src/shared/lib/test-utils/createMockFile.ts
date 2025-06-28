export function createMockFile(
	name: string,
	content = 'test',
	type = 'text/csv'
) {
	const file = new File([content], name, { type });
	return file;
}
