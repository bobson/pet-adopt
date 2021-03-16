import React, { useState, useEffect } from "react";

const Carousel = ({ media }) => {
  const [photos, setPhotos] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let images = ["http://placecorgi.com/600/600"];

    if (media.length) images = media.map(({ large }) => large);

    setPhotos(images);
  }, []);

  return (
    <div className="carousel">
      <img src={photos[active]} alt="animal" />
      <div className="carousel-smaller">
        {photos.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            onClick={(e) => setActive(+e.target.dataset.index)}
            data-index={index}
            src={photo}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
