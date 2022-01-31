import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DBstore from "../../service/DBstore";

const CompanyFounderDetail = (props) => {
  const { companyId, founderId } = useParams();
  const [founder, setFounder] = useState(undefined);

  useEffect(() => {
    DBstore.getFounder(founderId);
    const sub = DBstore.emitter.addListener("GET_FOUNDER_SUCCESS", () => {
      setFounder(DBstore.data);
    });
    return () => {
      sub.remove();
    };
  }, [founderId]);
  return (
    <div style={{ padding: "10px 40px" }}>
      <h1>Founder #{founderId} of company #{companyId}</h1>
      <ul>
        {founder ? (
          Object.keys(founder).map((key, index) => (
            <li key={index}>
              <p style={{ fontWeight: "bold" }}>{key}</p>
              <p>{founder[key]}</p>
            </li>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </ul>
    </div>
  );
};

export default CompanyFounderDetail;
