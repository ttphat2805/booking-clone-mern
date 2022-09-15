import { Route, Routes } from "react-router-dom";
import {
  hotelColumns,
  roomColumns,
  userColumns,
} from "../../utils/datatablesource";
import CreateHotel from "./CreateHotel/CreateHotel";
import CreateRoom from "./CreateRoom/CreateRoom";
import CreateUser from "./CreateUser/CreateUser";
import Dashboard from "./Dashboard";
import ListDataTable from "./ListDataTable/ListDataTable";
import SingleAdmin from "./SingleAdmin/SingleAdmin";

function Admin() {
  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      {/* USER */}
      <Route path="/user" element={<ListDataTable columns={userColumns} />} />
      <Route path="/user/:userId" element={<SingleAdmin />} />
      <Route
        path="/user/createUser"
        element={<CreateUser title="Add New User" />}
      />
      {/* HOTELs */}
      <Route path="/hotel" element={<ListDataTable columns={hotelColumns} />} />

      <Route path="/hotel/:hotelId" element={<SingleAdmin />} />

      <Route
        path="/hotel/createHotel"
        element={<CreateHotel title="Add New Hotel" />}
      />
      {/* ROOMS */}

      <Route path="/room" element={<ListDataTable columns={roomColumns} />} />

      <Route path="/room/:roomId" element={<SingleAdmin />} />

      <Route
        path="/room/createRoom"
        element={<CreateRoom title="Add New Room" />}
      />
    </Routes>
  );
}

export default Admin;
