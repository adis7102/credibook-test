import type { NextPage } from "next";
import JsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import dayjs from "dayjs";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { MovieListItem } from "../../types";

type Props = {
  data: MovieListItem[];
  show: boolean;
  onHide: (value: boolean) => void;
};

const ModalDownload: NextPage<Props> = ({ data, show, onHide }) => {
  const createPDF = async () => {
    const pdf: JsPDF = new JsPDF("portrait", "pt", "a4");
    const headers: string[][] = [["No", "Title", "Release Date", "Popularity", "Vote Average", "Vote Count"]];

    const cloneData: MovieListItem[] = JSON.parse(JSON.stringify(data));

    const dataTable = cloneData.map((item, index) => [String(index+1), item?.title, String(item?.release_date), String(item?.popularity), String(item?.vote_average), String(item?.vote_count)]);
    autoTable(pdf, {
      head: headers,
      body: dataTable,
      startY: 0,
      tableWidth: 'auto'
    })
    pdf.save("movie-list-data.pdf")
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      dialogClassName="modal-download"
      onHide={() => onHide(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Download</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table id="table-download" striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>title</th>
              <th>Release Date</th>
              <th>Popularity</th>
              <th>Vote Average</th>
              <th>Vote Count</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item?.title}</td>
                <td>{dayjs(item?.release_date).format("DD/MM/YYYY")}</td>
                <td>{item?.popularity}</td>
                <td>{item?.vote_average}</td>
                <td>{item?.vote_count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onHide(false)}>CLOSE </Button>
        <Button variant="success" onClick={() => createPDF()}>
          DOWNLOAD
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDownload;
