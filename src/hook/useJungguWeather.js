import { useEffect, useState } from "react";

export default function useWeather() {
  const apiKey = process.env.REACT_APP_OPENAPI_KEY;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 서울 중구 좌표 고정
  const lat = 37.5636;
  const lon = 126.9978;

  const getWeather = async () => {
    try {
      const url =
        `https://api.openweathermap.org/data/2.5/weather` +
        `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("API 요청 실패");
      const data = await res.json();

      const w0 = data?.weather?.[0];
      const condition = (w0?.main || "Clear").toLowerCase();
      const description = w0?.description || "";

      const isDay = data.dt >= data.sys.sunrise && data.dt < data.sys.sunset;

      setWeather({
        temp: Math.round(data.main?.temp ?? 0),
        humidity: data.main?.humidity ?? 0,
        description,
        condition,   
        isDay,       
      });
    } catch (e) {
      console.error("[weather] fetch error:", e);
      setError("날씨 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return { weather, loading, error };
}
