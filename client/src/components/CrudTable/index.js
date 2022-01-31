import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import { useState } from "react";
import CreateModal from "./CreateModal";

const useStyle = makeStyles({
  container: {
    padding: "40px",
  },
});

const CrudTable = (props) => {
  const classes = useStyle();
  const [isModalEnabled, setModalState] = useState(false);
  return (
    <div className={classes.container}>
      <Button onClick={() => setModalState(true)}>Add new</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {props.keys.map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((object, index) => (
              <TableRow key={index}>
                {props.keys.map((key) => (
                  <TableCell key={key}>{object[key]}</TableCell>
                ))}
                <TableCell>
                  {props.handleView !== undefined && (
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 6 }}
                      onClick={() => props.handleView(object[props.idKey])}
                    >
                      View
                    </Button>
                  )}

                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => props.handleDelete(object[props.idKey])}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {props.data.length < 1 && (
          <p style={{ padding: "20px" }}>No data recorded</p>
        )}
      </TableContainer>
      {isModalEnabled && (
        <CreateModal
          handleClose={() => setModalState(false)}
          handleSubmit={(formData) => console.log(formData)}
          keys={props.keys}
        />
      )}
    </div>
  );
};

export default CrudTable;
