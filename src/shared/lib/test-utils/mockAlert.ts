import { vi } from 'vitest';

export function mockAlert() {
	const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
	return {
		restore: () => alertMock.mockRestore(),
		alertMock,
	};
}
