import css from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  return (
    <div className={css.imgContainer}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={onImageClick}
      />
      <ul className={css.imgList}>
        <li className={css.imgItem}>{image.user.name}</li>
        <li className={css.imgItem}>{image.likes}</li>
      </ul>
    </div>
  );
};

export default ImageCard;
