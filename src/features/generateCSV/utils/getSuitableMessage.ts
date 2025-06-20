export const getSuitableMessage = (
  hasError: boolean,
  isGenerating: boolean,
  isFinishedGenerate: boolean
): string | null => {
  if (hasError) return 'упс, не то...';
  else if (isGenerating) return 'идёт процесс генерации';
  else if (isFinishedGenerate) return 'файл сгенерирован!';
  else return null;
};
