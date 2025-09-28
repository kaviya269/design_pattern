"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAdapter = void 0;
const LegacyWeatherApi_1 = require("./LegacyWeatherApi");
class WeatherAdapter {
    constructor() {
        this.legacy = new LegacyWeatherApi_1.LegacyWeatherApi();
    }
    async fetch(city) {
        var _a;
        if (!city)
            throw new Error('city required');
        const raw = await this.legacy.getWeather(city);
        // adapt: legacy returns tenths of Kelvin — convert to Celsius (made-up)
        const tempValue = (_a = raw === null || raw === void 0 ? void 0 : raw.data) === null || _a === void 0 ? void 0 : _a.t;
        if (typeof tempValue !== 'number')
            throw new Error('invalid legacy response');
        const temperatureCelsius = Math.round((tempValue / 10) - 273.15);
        return { city, temperatureCelsius };
    }
}
exports.WeatherAdapter = WeatherAdapter;
