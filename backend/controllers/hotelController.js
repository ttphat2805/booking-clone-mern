import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

export const createHotel = async (req, res) => {
  console.log(req.body);
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();

    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOneHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const oneDataHotel = await Hotel.findById(id);
    res.status(200).json(oneDataHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllHotel = async (req, res) => {
  const { min, max, ...others } = req.query;
  console.log(req.query);
  try {
    const allDataHotel = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min | 1, $lte: max || 999 },
    }).limit(req.query.limit);

    res.status(200).json(allDataHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteHotel = async (req, res) => {
  const id = req.params.id;
  try {
    await Hotel.findOneAndDelete(id);
    res.status(200).json("Hotel deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotelRoom = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};
