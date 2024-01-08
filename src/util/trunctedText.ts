
export const truncateText = (text: string, length?: number) => {
  if (length && text?.length <= length) {
    return text;
  }

  const truncatedText = text?.slice(0, length).trim();
  return truncatedText ;
};