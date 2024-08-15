import css from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  const { urls, alt_description, user, likes } = image;
  //деструктуризация объекта image, который содержит информацию об изображении.
  return (
    <div className={css.imgContainer}>
      {/*   Дальше рендерится сам элемент изображения. */}
      <img
        src={urls.small}
        /* src указывает на URL изображения в маленьком размере */
        alt={alt_description}
        /* alt устанавливает альтернативное описание изображения */
        onClick={onImageClick}
        /* при клике на изображение вызвать onImageClick */
        loading="lazy"
      />
      <ul className={css.imgList}>
        <li className={css.imgItem}>{user.name}</li>
        <li className={css.imgItem}>{likes}</li>
      </ul>
    </div>
  );
};

export default ImageCard;

/* Когда пользователь кликает на изображение, вызывается функция, которая 
обновляет modalState(используя setModalState) с данными изображения и устанавливает modalIsOpen: true.
Это приводит к тому, что ImageModal рендерится с новыми данными и открытым модальным окном. */
