import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavbarAdmin from "../../../components/Admin/navbar/Navbar";
import SidebarAdmin from "../../../components/Admin/sidebar/Sidebar";
import { Config } from "../../../config";
import { authServices } from "../../../services";
import useFetch from "../../../utils/hooks/useFetch";
import "./createRoom.scss";

const CreateRoom = ({ title }) => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [hotelId, setHotelId] = useState(undefined);
  const Navigate = useNavigate();

  const { data, loading, error } = useFetch(`${Config.apiUrl}/hotel`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      const newRooms = {
        ...info,
        roomNumbers,
      };
      const dataRooms = await authServices.createRooms(hotelId, newRooms);
      if (dataRooms.status === 200) {
        toast.success("Created Hotel Successfully");
        Navigate("/admin/room");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <SidebarAdmin />
      <div className="newContainer">
        <NavbarAdmin />
        <div className="content-main">
          <div className="card">
            <h1 className="page-title">{title}</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group center-item">
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Title"
                  name="title"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Price"
                  name="price"
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group center-item">
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Max People"
                  name="maxPeople"
                  variant="outlined"
                  onChange={handleChange}
                />
                <FormControl className="form-control w-30">
                  <InputLabel id="demo-simple-select-label">Hotel</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hotelId || ""}
                    label="Age"
                    onChange={(e) => setHotelId(e.target.value)}
                  >
                    {loading
                      ? "loading"
                      : data &&
                        data.map((hotel, index) => (
                          <MenuItem key={index} value={hotel._id}>
                            {hotel.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </div>
              <div className="form-group center-item">
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Description"
                  name="description"
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group center-item">
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Rooms"
                  variant="outlined"
                  onChange={(e) => setRooms(e.target.value)}
                />
              </div>

              <div className="submit-form">
                <button className="btn btn-submit">
                  {loadingSubmit ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
