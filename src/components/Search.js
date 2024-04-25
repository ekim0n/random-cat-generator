import axios from "axios";
import React, { useState, useEffect } from "react";
import { Kiisu } from "./Kiisu";

const apiURL = "https://api.thecatapi.com/v1/breeds";
const API_KEY = "";
const address = `${apiURL}?api_key=${API_KEY}`;

export const Search = () => {
  const [breed, setBreed] = useState("");
  const [breedsData, setBreedsData] = useState([]);
  const [breedPicture, setBreedPicture] = useState("");
  const [catInfo, setCatInfo] = useState("");
  const [catTemperament, setCatTemperament] = useState("");

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  useEffect(() => {
    axios
      .get(address)
      .then((response) => {
        const selectedBreedData = response.data.find(
          (data) => data.name === breed
        );
        if (selectedBreedData) {
          const breedImage = selectedBreedData.image.url;
          setBreedPicture(breedImage);
          const catType = selectedBreedData.description;
          setCatInfo(catType);
          const catTemp = selectedBreedData.temperament;
          setCatTemperament(catTemp);
        }
        setBreedsData(response.data.map((breedData) => breedData.name));
      })
      .catch((error) => {
        console.error(error); // Log the error for debugging
        alert("An error occurred while fetching data.");
      });
  }, [breed]);

  return (
    <div className="input-container">
      <label name="input-container">Breed:</label>
      <select id="breedSelect" onChange={handleBreedChange} value={breed || ""}>
        <option value="">Select Breed</option>
        {breedsData.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <img src={breedPicture} alt="" />
      <div className="temperament">{catTemperament}</div>
      {catInfo}

      <Kiisu />
    </div>
  );
};
