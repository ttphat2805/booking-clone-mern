import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Config } from "../../../config";
import { authServices } from "../../../services";
import useFetch from "../../../utils/hooks/useFetch";

import "./datatable.scss";
const Datatable = ({ columns }) => {
  const [list, setList] = useState();
  const location = useLocation();
  const [infoSite, setInfoSite] = useState({});
  const path = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(
    `${Config.apiUrl}/${infoSite.apiUrl}`
  );

  const handleChangeUrlApi = () => {
    switch (path) {
      case "user":
        setInfoSite({
          apiUrl: path,
          title: "Add New User",
          apiCreate: "createUser",
        });
        break;
      case "hotel":
        setInfoSite({
          apiUrl: path,
          title: "Add New Hotel",
          apiCreate: "createHotel",
        });
        break;

      case "room":
        setInfoSite({
          apiUrl: path,
          title: "Add New Room",
          apiCreate: "createRoom",
        });
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id) => {
    try {
      await authServices.deleteUser(id).then((res) => {
        console.log(res);
        setList(list.filter((item) => item._id !== id));
      });
    } catch (error) {}
  };

  useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    handleChangeUrlApi();
  }, [path]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {infoSite.title}
        <Link to={`/admin/${path}/${infoSite.apiCreate}`} className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <DataGrid
          className="datagrid"
          rows={list || []}
          columns={columns.concat(actionColumn)}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;
