import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavbarAdmin from "../../../components/Admin/navbar/Navbar";
import SidebarAdmin from "../../../components/Admin/sidebar/Sidebar";
import Loading from "../../../components/Loading";
import { authServices } from "../../../services";
import "./createUser.scss";
const CreateUser = ({ title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "booking");

    try {
      const uploadRes = await authServices.uploadImage(data);
      const { url } = uploadRes.data;
      const newUser = {
        ...info,
        image: url,
      };

      await authServices.Register(newUser);
      setTimeout(() => {
        setLoadingSubmit(false);
        toast.success("Created Hotel Successfully");
        Navigate("/admin/user");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetFile = (e) => {
    setLoading(true);
    setFile(e.target.files[0]);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
                  label="Email"
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  variant="outlined"
                />
              </div>
              <div className="form-group center-item">
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  label="Full Name"
                  onChange={handleChange}
                  name="fullname"
                  variant="outlined"
                />
                <TextField
                  className="form-control w-30"
                  id="outlined-basic"
                  onChange={handleChange}
                  label="Phone"
                  name="phone"
                  variant="outlined"
                />
              </div>

              <div className="form-group center-item">
                <div className="form-file">
                  <label htmlFor="image" className="label-file btn">
                    Choose file your avatar...
                    <input
                      className="form-control"
                      id="image"
                      type="file"
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
                        <img
                          src={file ? URL.createObjectURL(file) : ""}
                          alt=""
                        />
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

export default CreateUser;
