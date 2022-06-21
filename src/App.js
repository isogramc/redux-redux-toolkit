import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import CustomiseWeather from "./features/weather/CustomiseWeather";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CustomiseWeather />} />
      </Route>
    </Routes>
  );
}

export default App;
