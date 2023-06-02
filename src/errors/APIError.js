export default class APIError extends Error {
  constructor(response, data) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.data = data;
    this.message = data?.error || `${response.status} - ${response.statusText}`;
    // mensagens de erros tratados pelo back-end vêm na chave error do body
  }
}
