"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyWeatherApi = void 0;
// Simulates a legacy API that returns data in an awkward format
class LegacyWeatherApi {
    async getWeather(city) {
        // returns temperature in tenths of degree
        return { data: { t: Math.round((Math.random() * 300) + 200) } }; // some integer
    }
}
exports.LegacyWeatherApi = LegacyWeatherApi;
