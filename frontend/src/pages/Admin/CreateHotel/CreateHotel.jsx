import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import NavbarAdmin from "../../../components/Admin/navbar/Navbar";
import SidebarAdmin from "../../../components/Admin/sidebar/Sidebar";
import Loading from "../../../components/Loading";
import { Config } from "../../../config";
import { authServices } from "../../../services";
import { seletecType } from "../../../utils/Data";
import useFetch from "../../../utils/hooks/useFetch";
import "./createHotel.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateHotel = ({ title }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { data, loading, error } = useFetch(`${Config.apiUrl}/room`);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "booking");
          const uploadRes = await authServices.uploadImage(data);

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newHotel = {
        ...info,
        rooms,
        cheapestPrice: Number(info.cheapestPrice),
        photos: list,
      };
      await authServices.createHotel(newHotel);
      toast.success("Created Hotel Successfully");
      Navigate("/admin/hotel");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSetFile = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
    const selectedArray = Array.from(selectedFiles);
    const imagesArray = selectedArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((prev) => prev.concat(imagesArray));
  };
  const handleDeleteImage = (image) => {
    return setSelectedImages(selectedImages.filter((file) => file !== image));
  };
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
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
                  label="Name"
                  name="name"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="City"
                  name="city"
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group center-item">
                <FormControl className="form-control w-30">
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="type"
                    value={info?.type || ""}
                    label="Type"
                    onChange={handleChange}
                  >
                    {seletecType.map((type, index) => (
                      <MenuItem key={index} value={type.value}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="form-group center-item">
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Distance from City Center"
                  name="distance"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Title"
                  name="title"
                  variant="outlined"
                  onChange={handleChange}
                />
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
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Price"
                  type="number"
                  name="cheapestPrice"
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group center-item">
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Address"
                  name="address"
                  variant="outlined"
                  onChange={handleChange}
                />
                <FormControl className="form-control w-30">
                  <select
                    name="featured"
                    className="form-custom"
                    onChange={handleChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </FormControl>
              </div>
              <div className="form-group center-item">
                <FormControl className="form-control w-30">
                  <select
                    className="form-custom"
                    multiple
                    name="rooms"
                    onChange={handleSelect}
                  >
                    {data.map((room) => (
                      <option key={room?._id} value={room?._id}>
                        {room.title}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </div>
              <div className="form-group center-item">
                <div className="form-file">
                  <label htmlFor="image" className="label-file btn">
                    Choose image...
                    <input
                      className="form-control"
                      id="image"
                      type="file"
                      multiple
                      name="image"
                      onChange={(e) => handleSetFile(e)}
                      variant="outlined"
                    />
                  </label>
                  {loading ? (
                    <Loading />
                  ) : (
                    <div className="image-preview">
                      <div className="gallery">
                        {selectedImages?.map((image, index) => (
                          <div className="image-item" key={index}>
                            <img src={image} alt="" />
                            <button
                              onClick={() => handleDeleteImage(image)}
                              className="btn-icon"
                            >
                              <CloseIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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

export default CreateHotel;
