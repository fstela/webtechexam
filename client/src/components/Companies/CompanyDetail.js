import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CrudTable from "../CrudTable";
import DBstore from "../../service/DBstore";

const CompanyDetail = () => {
  const [founders, setFounders] = useState([]);
  const { companyId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    DBstore.getFounders(companyId);
    const sub = DBstore.emitter.addListener("GET_FOUNDERS_SUCCESS", () => {
      setFounders(DBstore.data);
    });
    return () => {
      sub.remove();
    };
  }, [companyId]);
  return (
    <>
      <h1 style={{ padding: "10px 40px" }}>Details for company #{companyId}</h1>
      <CrudTable
        idKey="FounderID"
        data={founders}
        keys={["FounderID", "Name", "Role"]}
        handleView={(id) => navigate(`/companies/${companyId}/founders/${id}`)}
        handleDelete={(id) => DBstore.deleteFounder(companyId, id)}
      />
    </>
  );
};

export default CompanyDetail;
