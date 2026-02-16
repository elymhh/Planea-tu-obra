'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

class BauhausScraper {
    constructor() {
        this.baseUrl = 'https://www.bauhaus.com';
    }

    async scrapeProducts() {
        try {
            const { data } = await axios.get(`${this.baseUrl}/products`);
            const $ = cheerio.load(data);
            const products = [];

            $('.product-list-item').each((index, element) => {
                const product = {
                    name: $(element).find('.product-name').text().trim(),
                    price: $(element).find('.product-price').text().trim(),
                    link: `${this.baseUrl}${$(element).find('a').attr('href')}`,
                };
                products.push(product);
            });

            return products;
        } catch (error) {
            console.error('Error scraping products:', error);
            return [];
        }
    }
}

module.exports = BauhausScraper;
