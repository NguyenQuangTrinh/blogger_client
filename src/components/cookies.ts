import Cookies from "js-cookie"


export const saveAccessTokenToCookie = (codeResponse: any) => {
  Cookies.set('access_token', codeResponse.access_token, { expires: codeResponse.expires_in }); // expires trong đơn vị ngày
};

export const getAccessTokenFromCookie = (): string | undefined => {
  return Cookies.get('access_token');
};

export const handleRemoveCookie = () => {
  Cookies.remove('access_token');
};
