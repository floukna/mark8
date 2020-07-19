import React from "react";
import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";
import Button from "@material-ui/core/Button";
import readXlsxFile from "read-excel-file";

const Box = styled.div`
  max-width: 1048px;
  margin: 2rem auto;
  background: white;
  color: black;
  padding: 1.5rem;
  border: 1px solid #00000033;
  border-radius: 6px;
  .title {
    font-size: 20px;
  }

  .link {
    color: #16b2f5;
    font-size: 14px;
  }

  .line {
    margin: 1rem -1.5rem;
    border-color: #0000001a;
  }

  .box {
    margin: 1rem 0;
    padding: 1.5rem;
    border: 1px solid #00000033;
    border-radius: 6px;
    display: flex;
  }

  .text {
    margin: 0 1rem;

    .head {
      font-weight: 700;
    }
  }
`;

export default function BoxUpload(props) {
  const { setData, setLoading } = props;
  const handleUpload = ({ target }) => {
    setLoading(true);
    readXlsxFile(target.files[0]).then((rows) => {
      setTimeout(() => {
        setData(rows);
        setLoading(false);
      }, 500);
    });
  };

  return (
    <Box>
      <div className="title">Bulk Upload form</div>
      <a className="link">You haven't upload any bulk data yet.</a>
      <hr className="line" />
      <div className="title">Choose your an input method</div>

      <div className="box">
        <div>
          <input
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet , application/vnd.ms-excel,.csv"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleUpload}
          />
          <label htmlFor="contained-button-file">
            <Button className="btn-upload" variant="contained" component="span">
              <PublishIcon style={{ fontSize: "56px" }}>send</PublishIcon>
            </Button>
          </label>
        </div>
        <div className="text">
          <div className="head">via CSV file</div>
          <div className="sub">อัพเดทข้อมูลจากไฟล์ CSV</div>
        </div>
      </div>
    </Box>
  );
}
