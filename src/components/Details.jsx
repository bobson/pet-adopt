import React, { useState, useEffect, useContext } from "react";
import pet from "@frontendmasters/pet";
import { navigate, Link } from "@reach/router";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

const Details = ({ id }) => {
  const [animal, setAnimal] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    // vo slucaj na error
    // throw new Error("lol");
    const getPetId = async () => {
      const { animal } = await pet.animal(id);
      const displayAnimal = {
        url: animal.url,
        name: animal.name,
        animalType: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
      };
      setAnimal(displayAnimal);
      setLoading(false);
    };
    getPetId();
    return () => {
      setLoading(false);
      setAnimal({});
    };
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const { url, animalType, breed, location, description, media, name } = animal;

  return (
    <div>
      {loading ? (
        <h1>loading ...</h1>
      ) : (
        <div className="details">
          <Carousel media={media} />
          <div>
            <h1>{name}</h1>
            <h2>{`${animalType} - ${breed} - ${location}`}</h2>
            <div className="buttons">
              <Link style={{ textDecoration: "none" }} to="/">
                <button style={{ backgroundColor: theme }}>Back</button>
              </Link>
              <button onClick={toggleModal} style={{ backgroundColor: theme }}>
                Adopt {name}
              </button>
            </div>
            <p>{description}</p>
            {showModal && (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}</h1>
                  <div className="buttons">
                    <button
                      style={{ background: theme }}
                      target="_blank"
                      onClick={() => navigate(url)}
                    >
                      Yes
                    </button>
                    <button style={{ background: theme }} onClick={toggleModal}>
                      No, I&apos;m a monster
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details id={props.id} />
    </ErrorBoundary>
  );
}
