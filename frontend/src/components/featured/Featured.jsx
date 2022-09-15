import { Config } from "../../config";
import useFetch from "../../utils/hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    `${Config.apiUrl}/hotel/countByCity?cities=Ho Chi Minh,Da Nang,Ha Noi`
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{data[0]}</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{data[1]}</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://a.cdn-hotels.com/gdcs/production144/d1394/a304783d-6dc9-4bb2-9239-d124a16a154e.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{data[2]}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
