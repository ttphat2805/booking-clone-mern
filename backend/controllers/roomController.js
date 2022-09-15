import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

export const createRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      res.status(500).json(error);
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOneRoom = async (req, res) => {
  const id = req.params.id;
  try {
    const oneDataRoom = await Room.findById(id);
    res.status(200).json(oneDataRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllRoom = async (req, res) => {
  try {
    const allDataRoom = await Room.find();
    res.status(200).json(allDataRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateRoom = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateRoomAvailability = async (req, res) => {
  const id = req.params.id;
  try {
    await Room.updateOne(
      { "roomNumbers._id": id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Update Room Availability Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelId;

  const id = req.params.id;
  try {
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: id },
      });
    } catch (error) {
      res.status(500).json(error);
    }

    await Room.findOneAndDelete(id);
    res.status(200).json("Room deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
