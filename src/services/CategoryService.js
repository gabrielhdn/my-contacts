import HttpClient from './utils/HttpClient';

class CategoryService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  getCategories() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoryService();
