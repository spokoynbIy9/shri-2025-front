export function createMockFile(name: string, size = 1234, type = 'text/csv') {
	const file = new File(['test'], name, { type });
	Object.defineProperty(file, 'size', { value: size });
	return file;
}
