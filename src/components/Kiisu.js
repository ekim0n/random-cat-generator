import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const catURL = "https://api.thecatapi.com/v1/images/search";

export const Kiisu = () => {
  const [catImage, setCatImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  const fetchRandomCat = () => {
    axios
      .get(catURL)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const image = response.data[0].url;
          setCatImage(image);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };


  useEffect(() => {
    fetchRandomCat();
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading a random cat picture...</p>
      </div>
    );
  } else {
    return (
      <>
      <div className="cat-image-container">
        <h2>Random cat image:</h2>
        <img src={catImage} alt="Random Cat" />
      </div>
      <button className="randomCatButton" onClick={fetchRandomCat}>Random Cat</button>
      </>
    );
  }
};
