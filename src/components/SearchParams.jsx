import React, { useState, useEffect } from "react";
import useDropdown from "./useDropdown";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  const requestAnimals = async () => {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  };

  useEffect(() => {
    // setBreeds([]);
    // setBreed("");  - I think no need, it couses one more rerender of the component
    const requestBreeds = async () => {
      const { breeds } = await pet.breeds(animal);
      if (breeds) {
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      } else setBreeds([]);
    };
    requestBreeds();

    //************************Old way promise *******************/
    // pet.breeds(animal).then(({ breeds }) => {
    //   const breedStrings = breeds.map(({ name }) => name);
    //   setBreeds(breedStrings);
    // }, console.error);

    //cleanup function
    return () => {
      setBreeds([]), setBreed(""), setPets([]);
    };
  }, [animal]);

  console.log(animal);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestAnimals();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button type="submit">Submit</button>
      </form>
      {pets.length ? <Results pets={pets} /> : null}
    </div>
  );
};

export default SearchParams;
