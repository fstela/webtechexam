import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyList from "./components/Companies/CompanyList";
import CompanyDetail from "./components/Companies/CompanyDetail";
import CompanyFounderDetail from "./components/Companies/CompanyFounderDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/companies/:companyId" element={<CompanyDetail />} />
        <Route
          path="/companies/:companyId/founders/:founderId"
          element={<CompanyFounderDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
