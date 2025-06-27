import { fireEvent, render } from '@testing-library/react';
import { UploadContainer } from '../UploadContainer';
import { createMockFile } from '../../../../../shared/lib/test-utils';

export function makeDropToZone(
	testId: string,
	filename: string,
	fileType: File['type'],
	fileSize: number
) {
	const { getByTestId } = render(<UploadContainer />);
	const dropzone = getByTestId(testId);

	const file = createMockFile(filename, fileSize, fileType);

	const dataTransfer = {
		files: [file],
		types: ['Files'],
		items: [
			{
				kind: 'file',
				type: fileType,
				getAsFile: () => file,
			},
		],
	};

	fireEvent.drop(dropzone, { dataTransfer });
}
