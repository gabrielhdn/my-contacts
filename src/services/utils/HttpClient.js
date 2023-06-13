import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint, options) {
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  post(endpoint, options) {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(endpoint, options) {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(endpoint, options) {
    return this.makeRequest(endpoint, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  async makeRequest(endpoint, options) {
    await delay(500); // simulação de delay

    let data = null;
    const headers = new Headers();

    // permite a leitura do body no back-end
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([headerName, headerValue]) => {
        headers.append(headerName, headerValue);
      });
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
      signal: options.signal,
    });

    // * será undefined se a resposta não tiver corpo (204 No Content)
    const contentType = response.headers.get('Content-Type');

    // garante que existe um body com conteúdo json na resposta
    if (contentType?.includes('application/json')) {
      data = await response.json();
    }

    // o valor de 'ok' será true quando o status for de sucesso (200-299)
    if (response.ok) {
      return data;
    }

    throw new APIError(response, data);
  }
}

export default HttpClient;
