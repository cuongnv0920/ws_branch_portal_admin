import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import linkApi from "../../../../api/linkApi";
import Create from "../Create";
import Delete from "../Delete";
import Edit from "../Edit";
import { useSnackbar } from "notistack";
import { removeSelected, selected } from "../../linkSlice";

LinkList.propTypes = {};

const columns = [
  {
    title: "STT",
    field: "stt",
    editable: "never",
  },
  {
    title: "Tiêu đề",
    field: "title",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Liên kết",
    field: "url",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Ngày khởi tạo",
    field: "createdAt",
    render: (row) => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>,
    cellStyle: { whiteSpace: "nowrap" },
  },
];

function LinkList(props) {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [onSelected, setOnSelected] = useState();
  const [rowData, setRowData] = useState([]);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
  };

  const handleOpenDialogCreate = () => {
    setOpenDialogCreate(true);
  };

  const handleCloseDialogEdit = async () => {
    const action = removeSelected();
    await dispatch(action);

    setOpenDialogEdit(false);
  };

  const handleCloseDialogDelete = async () => {
    const action = removeSelected();
    await dispatch(action);

    setOpenDialogDelete(false);
  };

  const onRowUpdate = async () => {
    if (onSelected?.length >= 2) {
      enqueueSnackbar("Bạn chỉ được chọn 1 dòng.", { variant: "warning" });
    } else {
      const action = selected(onSelected[0]);
      await dispatch(action);

      setOpenDialogEdit(true);
    }
  };

  const onRowDelete = async () => {
    if (onSelected?.length >= 2) {
      enqueueSnackbar("Bạn chỉ được chọn 1 dòng.", { variant: "warning" });
    } else {
      const action = selected(onSelected[0]);
      await dispatch(action);

      setOpenDialogDelete(true);
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const links = await linkApi.list();

      setRowData(links.map((link, index) => ({ ...link, stt: index + 1 })));
    };
    fetchLinks();
  }, [openDialogCreate, openDialogEdit, openDialogDelete]);

  return (
    <>
      <MaterialTable
        title={
          <div className="materialTableTitle">
            <Typography className="materialTableTitle_content" variant="h6">
              Danh sách liên kết
            </Typography>
          </div>
        }
        columns={columns}
        data={rowData}
        onSelectionChange={(row) => setOnSelected(row)}
        actions={[
          {
            icon: () => <AddCircleIcon className="materialTableIconAdd" />,
            tooltip: "Add News",
            isFreeAction: true,
            onClick: handleOpenDialogCreate,
          },

          {
            icon: () => <DeleteIcon className="materialTableIconDelete" />,
            tooltip: "Delete News",
            onClick: onRowDelete,
          },

          {
            icon: () => <EditIcon className="materialTableIconEdit" />,
            tooltip: "Edit News",
            onClick: onRowUpdate,
          },
        ]}
        options={{
          tableLayout: "auto",
          headerStyle: {
            fontSize: "0.8rem",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            color: "#1c2e36",
            fontFamily: "'Muli', sans-serif",
          },

          rowStyle: {
            fontSize: "0.8rem",
          },
          selection: true,
          pageSizeOptions: [10, 20, 30, 50],
          pageSize: 10,
          paging: true,
          addRowPosition: "first",
          showSelectAllCheckbox: false,
        }}
      />

      <Dialog
        maxWidth="md"
        open={openDialogCreate}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogCreate(event, reason);
          }
        }}
      >
        <DialogContent>
          <Create closeDialog={handleCloseDialogCreate} />
        </DialogContent>

        <DialogActions className="dialogAction">
          <Button
            className="dialogButtonCancel"
            onClick={handleCloseDialogCreate}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="md"
        open={openDialogEdit}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogEdit(event, reason);
          }
        }}
      >
        <DialogContent>
          <Edit closeDialog={handleCloseDialogEdit} />
        </DialogContent>

        <DialogActions className="dialogAction">
          <Button
            className="dialogButtonCancel"
            onClick={handleCloseDialogEdit}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="md"
        open={openDialogDelete}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogDelete(event, reason);
          }
        }}
      >
        <DialogContent>
          <Delete closeDialog={handleCloseDialogDelete} />
        </DialogContent>

        <DialogActions className="dialogAction">
          <Button
            className="dialogButtonCancel"
            onClick={handleCloseDialogDelete}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LinkList;