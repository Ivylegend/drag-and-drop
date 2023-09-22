import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./Moving.css";
import galleryList from "./data.js";
import { FaSearch } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-loading";

const Card = ({ src, title, id, index, moveImage }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 1 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="card">
      <img src={src} alt={title} />
    </div>
  );
};

const Moving = () => {
  const [images, setImages] = useState(galleryList);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  setInterval(() => {
    setLoading(false);
  }, 2000);

  const moveImage = React.useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];

      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);

  return (
    <>
      <div className="header">
        <div>
          <h1>A Draggable Gallery</h1>
          <i className="text1">Drag and drop the images to rearrange to what suits you</i>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Seach for any images by tag"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch />
        </div>
      </div>
      {loading ? (
        <span className="load">
          <p className="loadingspinner"></p>
          <p className="loading">Loading...</p>
        </span>
      ) : (
        <main>
          {React.Children.toArray(
            images
              .filter((photo) => {
                return search.toLocaleLowerCase() === ""
                  ? photo
                  : photo.title
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase());
              })
              .map((image, index) => (
                <div className="wrapper">
                  <Card
                    src={image.img}
                    title={image.title}
                    id={image.id}
                    index={index}
                    moveImage={moveImage}
                  />
                  <p className="text">{image.title}</p>
                </div>
              ))
          )}
        </main>
      )}
    </>
  );
};

export default Moving;
