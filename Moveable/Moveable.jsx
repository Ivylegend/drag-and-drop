import React from "react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import gal1 from "../../assets/images/gal1.png";
import gal2 from "../../assets/images/gal2.png";
import gal3 from "../../assets/images/gal3.png";
import gal4 from "../../assets/images/gal4.png";
import gal5 from "../../assets/images/gal5.png";
import gal6 from "../../assets/images/gal6.png";
import gal7 from "../../assets/images/gal7.png";
import gal8 from "../../assets/images/gal8.png";
import gal9 from "../../assets/images/gal9.png";
import gal10 from "../../assets/images/gal10.png";
import "./Moveable.css";
import AuthDetails from "../src/components/auth/AuthDetails";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      {
        id: "26fd50b3-3841-496e-8b32-73636f6f4197",
        name: "New City",
        image: gal1,
      },
      {
        id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525",
        name: "Art",
        image: gal2,
      },
      {
        id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2528",
        name: "Admire",
        image: gal3,
      },
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Architecture",
        image: gal4,
      },
      {
        id: "5bee94eb-6bde-4411-b438-1c37fa6af364",
        name: "Wallpaper",
        image: gal5,
      },
      {
        id: "5bee94eb-6bde-4411-b438-1c37fa6af367",
        name: "Cars",
        image: gal6,
      },
      {
        id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc",
        name: "Cars",
        image: gal7,
      },
      {
        id: "d3edf796-6449-4931-a777-ff66965a025b",
        name: "Aquaman",
        image: gal8,
      },
      {
        id: "960cbbcf-89a0-4d79-aa8e-56abbc15eadd",
        name: "Netflix",
        image: gal10,
      },
      {
        id: "d3edf796-6449-4931-a777-ff66965a024d",
        name: "Cars",
        image: gal9,
      },
    ],
    tint: 1,
  },
];

const Moveable = () => {
  const [stores, setStores] = useState(DATA);

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="header">
            <h1>Gallery</h1>
            <p>Drag and drop the images in any loction of your choice</p>
          </div>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="drag"
              >
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    index={index}
                    key={store.id}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <StoreList {...store} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <AuthDetails />
    </div>
  );
};

function StoreList({ name, items, id, image }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {/* <div className="store-container">
            <h3>{name}</h3>
          </div> */}
          <div className="items-container gallery">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="item-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                    <img src={item.image} alt={item.name} className="gal-img" />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Moveable;
