export function getSuitableMessage(
  isFileUploaded: boolean,
  hasError: boolean,
  isAnalyzing: boolean,
  isFinishedAnalyse: boolean
): string {
  if (isFileUploaded) {
    if (hasError) {
      return 'упс, не то...';
    } else if (isAnalyzing) {
      return 'идёт парсинг файла';
    } else if (isFinishedAnalyse) {
      return 'готово!';
    } else {
      return 'файл загружен!';
    }
  } else {
    return 'или перетащите сюда';
  }
}
