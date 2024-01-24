
export default function SpotImagesList ({spotImages}) {
    const mainImage = spotImages.find(img => img.preview);
    const subImages = spotImages.filter(img => !img.preview);

    return (
        <div className="spot-image-container">
            <div id='main-image'>
                <img src={mainImage.url} />
            </div>

            <div id="sub-images-container">
                {
                    subImages.map(img => {
                        return (
                            <div key={img.id} className="sub-images">
                                <img src={img.url} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
