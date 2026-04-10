import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomerRewardsComponents } from "./components/customerComponents/customerComponents";
import { CustomerLogin } from "./components/customerLogin/customerLogin";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
        <Route path="/customer-rewards" element={<CustomerRewardsComponents />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
