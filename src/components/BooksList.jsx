import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css"; // Import CSS file for component styling
import LogoutButton from "./Logout";
import { db } from "../firebase"; // Adjust this path as needed
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"; // If you're using react-firebase-hooks
import { auth } from "../firebase"; // Adjust this path as needed
import Button from "react-bootstrap/Button";

//Main component fetching books by search input
function BooksList() {
  const [user] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [searchedImages, setSearchedImages] = useState([]);
  const [confirmedImage, setConfirmedImage] = useState("");

  useEffect(() => {
    if (user) {
      const fetchImages = async () => {
        const imagesRef = collection(db, "userImages", user.uid, "images");
        const q = query(imagesRef);
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setSearchedImages([]);
        } else {
          const images = querySnapshot.docs.map((doc) => doc.data().imageUrl);
          setSearchedImages(images);
        }
      };

      fetchImages().catch(console.error);
    }
  }, [user]);

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

  const handleConfirmImage = async () => {
    if (imageUrl && user) {
      const newImageList = [...searchedImages, imageUrl];
      setSearchedImages(newImageList);
      setConfirmedImage(imageUrl);
      setImageUrl(""); // Reset the imageUrl state after confirming

      try {
        await addDoc(collection(db, "userImages", user.uid, "images"), {
          imageUrl: imageUrl,
        });
      } catch (error) {
        console.error("Error adding image to Firestore: ", error);
      }
    }
  };

  const handleRedoSearch = () => {
    setSearchTerm("");
    setImageUrl("");
    setConfirmedImage("");
  };

  return (
    <div className="books-list">
      <header>
        <LogoutButton />
      </header>
      <h1 className="title">Add finished books</h1>
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-primary" onClick={handleImageSearch}>
          Search book
        </Button>{" "}
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
        <h2 className="title">My bookshelf:</h2>
        <div className="image-list">
          {searchedImages.length > 0 ? (
            searchedImages.map((image, index) => (
              <img
                src={image}
                alt={`Searched Image ${index + 1}`}
                key={index}
                className="previous-image"
              />
            ))
          ) : (
            <p>No images found. Start searching and add some!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BooksList;
