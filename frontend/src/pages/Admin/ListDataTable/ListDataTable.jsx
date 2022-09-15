import Datatable from "../../../components/Admin/datatable/Datatable";
import NavbarAdmin from "../../../components/Admin/navbar/Navbar";
import SidebarAdmin from "../../../components/Admin/sidebar/Sidebar";
import "./list.scss";

const ListDataTable = ({ columns }) => {
  return (
    <div className="list">
      <SidebarAdmin />
      <div className="listContainer">
        <NavbarAdmin />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default ListDataTable;
