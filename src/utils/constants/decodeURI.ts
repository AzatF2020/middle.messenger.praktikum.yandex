const decodeURI = (uri: string): string => decodeURIComponent(uri.replace(/\+/g, ' '));

export default decodeURI;
