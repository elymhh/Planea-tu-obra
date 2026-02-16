const axios = require('axios');
const cheerio = require('cheerio');

class ObramatScraper {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async fetchProductPage(url) {
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            console.error(`Error fetching ${url}: ${error}`);
            return null;
        }
    }

    async scrapeProducts() {
        const productList = [];
        // Add the URLs of the pages you want to scrape:
        const urls = [
            `${this.baseUrl}/category1`,
            `${this.baseUrl}/category2`,
            // Add more URLs as needed
        ];
        
        for (const url of urls) {
            const html = await this.fetchProductPage(url);
            if (html) {
                const $ = cheerio.load(html);
                $('.product-card').each((index, element) => {
                    const product = {
                        title: $(element).find('.product-title').text().trim(),
                        price: $(element).find('.product-price').text().trim(),
                        link: $(element).find('a').attr('href')
                    };
                    productList.push(product);
                });
            }
        }
        return productList;
    }
}

// Example usage:
const scraper = new ObramatScraper('https://www.obramat.com');

scraper.scrapeProducts().then(products => {
    console.log(products);
}).catch(error => {
    console.error(error);
});