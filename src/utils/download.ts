const download = (content: string, fileName: string): void => {
  const a = document.createElement('a');
  a.href = content;
  a.download = fileName;
  a.click();
  a.remove();
}

export default download;