import Chart from "../../../components/Admin/chart/Chart";
import FeaturedAdmin from "../../../components/Admin/featured/Featured";
import NavbarAdmin from "../../../components/Admin/navbar/Navbar";
import SidebarAdmin from "../../../components/Admin/sidebar/Sidebar";
import TableAdmin from "../../../components/Admin/table/Table";
import Widget from "../../../components/Admin/widget/Widget";
import "../../Admin/";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="home">
      <SidebarAdmin />
      <div className="homeContainer">
        <NavbarAdmin />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <FeaturedAdmin />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <TableAdmin />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
