import api from "./api";

export const requestApi = async ({
  requestURI,
  requestType,
  requestBody = {},
  onSuccess,
  onError,
}) => {
  try {
    const response = await api[requestType](requestURI, requestBody);

    if (response.status === 200) {
      onSuccess?.(response);
    } else {
      throw new Error(`${requestURI} ${requestType} status is not 200`);
    }
  } catch (error) {
    console.log(error);
    onError?.(error);
  }
};
