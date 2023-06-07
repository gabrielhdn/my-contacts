import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoryService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async getCategories() {
    const categories = await this.httpClient.get('/categories');

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoryService();
