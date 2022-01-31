import { Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  background: "white",
  padding: "20px",
  width: "50%",
  height: "auto",
  minHeight: "80%",
};

const styleGrid = {
  display: "grid",
  gridGap: "20px",
  marginBottom: "20px",
  marginTop: "20px",
};

const CreateModal = (props) => {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState(undefined);

  useEffect(() => {
    const formObj = props.keys.reduce((prev, curr) => {
      return { [curr]: "", ...prev };
    }, {});
    setFormData(formObj);
  }, []);

  const validateAndSubmit = () => {
    let isValid = true;

    props.keys.forEach((key) => {
      if (formData[key] === "") {
        setErr(`Invalid field ${key}`);
        isValid = false;
      }
    });

    if (isValid) {
      props.handleSubmit(formData);
    }
  };

  const onFieldChange = (key, value) => {
    setFormData({ ...formData, ...{ [key]: value } });
  };

  return (
    <>
      <Modal
        open={true}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={styleBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <div style={styleGrid}>
            {props.keys.map((key) => (
              <TextField
                key={key}
                id="outlined-basic"
                label={key}
                variant="outlined"
                onChange={(e) => onFieldChange(key, e.target.value)}
              />
            ))}
          </div>
          <Button
            color="secondary"
            variant="contained"
            onClick={validateAndSubmit}
          >
            Add
          </Button>

          {err && <p style={{ marginTop: "20px", color: "red" }}>{err}</p>}
        </Box>
      </Modal>
    </>
  );
};

export default CreateModal;
