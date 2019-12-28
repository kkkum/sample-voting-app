import 'isomorphic-fetch';

/**
 * Ensures non 2xx responses count as an error even if the body contains valid JSON
 * @param res
 */
export const handleJsonResponse = res =>
  res.json()
    .catch((err) => {
      if (res.ok) {
        return {};
      }
    })
    .then((json) => {
      if (res.ok) {
        return json;
      }
      let errMessage = json.error || json.description;
      throw Object.assign(new Error(errMessage), json, { statusText: res.statusText, statusCode: res.status });
    });

/**
 * Convenience methods for calling the backend
 * includes .post() method
 *
 * @param path
 * @param [opts]
 */
const api = (path, opts = {}) => {
  const options = Object.assign({
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en',
      'Content-Type': opts.body ? 'application/json' : undefined,
    },
  }, opts);

  return fetch(path, options).then(handleJsonResponse);
};

api.get = api;

/**
 * Post the Vote to the backend
 * @param vote
 * @return Promise<Object>
 */
export const postVote = (vote) => {
  console.log('Vote is:', vote);
  return api.get(`/backend/${vote}`);
};
