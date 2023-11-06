import React from "react";
import { useState, useEffect } from "react";
import PictureBoard from "./PictureItem";
import PictureList from "./PictureList";
import galleryList from "./data";

const ImageGallery = () => {
    //const [imageList, setImageList] = useState(galleryList)
    return (
        <>
            <div className="pictureList">
                <PictureList/>
            </div>
        </>
    )
}

export default ImageGallery;