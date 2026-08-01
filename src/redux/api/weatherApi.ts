import { baseApi } from "./baseApi";

export const weatherApi = baseApi.injectEndpoints({

endpoints:(builder)=>({

todayWeather:builder.query({

query:()=>"/weather/today"

}),

forecast:builder.query({

query:()=>"/weather/forecast"

})

})

})

export const{
useTodayWeatherQuery,
useForecastQuery
}=weatherApi