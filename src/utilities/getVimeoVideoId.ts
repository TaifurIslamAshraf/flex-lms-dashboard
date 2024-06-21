export const getVimeoVideoId = (url?: string) => {
  if (!url) {
    return null;
  }
  // Regular expression to check if the URL is a valid Vimeo video URL
  const vimeoUrlRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com\/)(\d+)(\/.*)?$/;

  const match = url.match(vimeoUrlRegex);

  if (match && match[4]) {
    return match[4];
  } else {
    return null;
  }
};
