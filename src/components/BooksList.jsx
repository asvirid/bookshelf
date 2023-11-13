import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css"; // Import CSS file for component styling

function BooksList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [searchedImages, setSearchedImages] = useState([]);
  const [confirmedImage, setConfirmedImage] = useState("");

  useEffect(() => {
    const storedImages = localStorage.getItem("searchedImages");
    if (storedImages) {
      setSearchedImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchedImages", JSON.stringify(searchedImages));
  }, [searchedImages]);

  const handleImageSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
          searchTerm
        )}&cx=628e804c6c4e74ae6&key=AIzaSyA_GfjyCL8EplRD4-aZ-sv2KsvIGMaIrog&searchType=image`
      );

      const firstImage = response.data.items[0].link;
      setImageUrl(firstImage);
      setConfirmedImage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmImage = () => {
    if (imageUrl) {
      setSearchedImages((prevImages) => [...prevImages, imageUrl]);
      setConfirmedImage(imageUrl);
      setImageUrl(""); // Reset the imageUrl state after confirming
    }
  };

  const handleRedoSearch = () => {
    setSearchTerm("");
    setImageUrl("");
    setConfirmedImage("");
  };

  return (
    <div className="books-list">
      <h1>My library</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleImageSearch}>Search book</button>
      </div>
      {imageUrl && !confirmedImage && (
        <div className="current-image">
          <img src={imageUrl} alt="Searched Image" />
          <div>
            <button onClick={handleConfirmImage}>Confirm</button>
            <button onClick={handleRedoSearch}>Redo Search</button>
          </div>
        </div>
      )}
      {confirmedImage && (
        <div className="confirmed-image">
          <img src={confirmedImage} alt="Confirmed Image" />
        </div>
      )}
      <div className="previous-images">
        <h2>Bookshelf </h2>
        <div className="image-list">
          {searchedImages.map((image, index) => (
            <img
              src={image}
              alt={`Searched Image ${index + 1}`}
              key={index}
              className="previous-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BooksList;
