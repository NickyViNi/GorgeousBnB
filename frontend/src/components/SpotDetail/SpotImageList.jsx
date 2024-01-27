import { useState } from "react";

export default function SpotImagesList ({spotImages}) {
    const mainImage = spotImages.find(img => img.preview);
    const subImages = spotImages.filter(img => !img.preview);

    const [isFullScreen, setFullScreen] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState(null);

    const toggleFullScreen = (imgURL) => {
        setFullScreen(!isFullScreen);
        setFullScreenImage(imgURL);
    }

    const closeFullScreen = () => {
        setFullScreen(false);
    }

    return (
        <div className="spot-image-container">
            <div id='main-image' onClick={() => toggleFullScreen(mainImage?.url)}>
                <img src={mainImage?.url} alt="Spot Preview Image" />
            </div>

            <div id="sub-images-container">
                {
                    subImages.map(img => {
                        return (
                            <div key={img.id} className="sub-images" onClick={() => toggleFullScreen(img?.url)}>
                                <img src={img?.url} alt="Other Spot Image" />
                            </div>
                        )
                    })
                }
            </div>
            {isFullScreen && (
                <div className="fullscreen-image-container" >
                    <img src={fullScreenImage} alt="Spot Image" onClick={closeFullScreen} />
                    <button onClick={closeFullScreen}>Close</button>
                </div>
            )}
        </div>
    )
}
