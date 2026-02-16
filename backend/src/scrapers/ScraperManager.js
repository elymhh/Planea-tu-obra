class ScraperManager {
    constructor() {
        this.scrapers = [];
    }

    addScraper(scraper) {
        this.scrapers.push(scraper);
    }

    async scrapeAllStores() {
        const promises = this.scrapers.map(scraper => scraper.scrape());
        const results = await Promise.all(promises);

        return this.groupByProduct(results);
    }

    groupByProduct(results) {
        const groupedResults = {};

        results.forEach(storeResults => {
            storeResults.forEach(product => {
                if (!groupedResults[product.id]) {
                    groupedResults[product.id] = {
                        ...product,
                        stores: []
                    };
                }
                groupedResults[product.id].stores.push(product.store);
            });
        });

        return Object.values(groupedResults);
    }
}

module.exports = ScraperManager;