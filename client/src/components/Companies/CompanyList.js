import { useEffect, useState } from "react";
import DBstore from "../../service/DBstore";
import CrudTable from "../CrudTable";
import { useNavigate } from "react-router";

function Company() {
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    DBstore.getCompanies();
    const sub = DBstore.emitter.addListener("GET_COMPANIES_SUCCESS", () => {
      setCompanies(DBstore.data);
    });
    return () => {
      sub.remove();
    };
  }, []);

  const handleDelete = async (id) => {
    await DBstore.deleteCompany(id);
    DBstore.getCompanies();
    DBstore.emitter.addListener("GET_COMPANIES_SUCCESS", () => {
      setCompanies(DBstore.data);
    });
  };

  return (
    <>
      <h1 style={{ padding: "10px 40px" }}>Companies</h1>
      <CrudTable
        keys={["CompanyID", "Name", "FoundedDate"]}
        idKey="CompanyID"
        data={companies}
        handleView={(id) => navigate(`/companies/${id}`)}
        handleDelete={(id) => handleDelete(id)}
      />
    </>
  );
}

export default Company;
