import ImageCard from "./ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.imgList}>
      {images.map((image) => {
        return (
          <li className={css.imgItem} key={image.id}>
            <ImageCard
              image={image}
              onImageClick={() =>
                onImageClick(
                  image.urls.regular,
                  image.alt_description,
                  image.user.name,
                  image.likes,
                  image.description
                )
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
