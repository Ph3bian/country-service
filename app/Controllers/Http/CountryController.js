'use strict';

const Axios = use('axios');
const Config = use('Config');

class CountryController {
    constructor() {
        this.countriesApiUrl = 'https://restcountries.eu/rest/v2/name';

        this.exchangeRatesApiUrl = 'http://data.fixer.io/api/latest';

        this.exchangeAccessKey = Config.get('app.fixerKey');
    }

    async search({ auth, request, response }) {
        // fetch countries
        const { search } = request.all();

        if (!search) {
            return response.badRequest({
                success: false,
                message: 'Invalid search parameter.'
            });
        }

        try {
            const { data } = await Axios.get(
                `${this.countriesApiUrl}/${search}`
            );

            const [country] = data;

            if (!country) throw new Error(`Country not found ${search}`);

            const currencies = country.currencies
                .map(currency => currency.code)
                .join(',');

            const { data: exchangeData } = await Axios.get(
                `${this.exchangeRatesApiUrl}?access_key=${this.exchangeAccessKey}&base=EUR&symbols=${currencies}`
            );

            return {
                success: true,
                fullName: country.name,
                population: country.population,
                currencies: currencies,
                exchangeRates: exchangeData.rates
            };
        } catch (error) {
            return response.badRequest({
                success: false,
                message: `Error fetching country: ${search}`,
                error
            });
        }
    }
}

module.exports = CountryController;
