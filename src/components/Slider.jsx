import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Spinner from "./Spinner";

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc", limit(5)));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    getListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    <>
      {listings && (
        <>
          <p className="exploreHeading">Recommended</p>
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              autoplay={{
                delay: 2000,
              }}
              pagination={{ clickable: true }}
            >
              {listings.map(({ data, id }) => (
                <SwiperSlide
                  key={id}
                  onClick={() => {
                    navigate(`/category/${data.type}/${id}`);
                  }}
                >
                  <div
                    style={{
                      background: `url(${data.imgUrls[0]}) center no-repeat`,
                      backgroundSize: "cover",
                      height: "30vh",
                    }}
                    className="swiperSlideDiv"
                  >
                    <p className="swiperSlideText">{data.name}</p>
                    <p className="swiperSlidePrice">
                      ${data.discountedPrice ?? data.regularPrice}
                      {data.type === "rent" && " / month"}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
}

export default Slider;
