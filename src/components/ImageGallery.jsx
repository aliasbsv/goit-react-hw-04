import ImageCard from "./ImageCard";
import css from "./ImageGallery.module.css";

/* Компонент принимает 2 пропса: 
- images -массив объектов с данными о изображениях. 
- onImageClick — функция-обработчик, которая будет вызываться при клике на изображение.
 Эта функция используется для передачи данных о выбранном изображении обратно в 
 родительский компонент (в данном случае, App).  */

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

/* Внутри каждого элемента списка рендерится компонент ImageCard, который отображает само изображение 
и сопутствующую информацию. ImageCard получает два пропса:
  - image — объект с данными об изображении, переданный в компонент ImageCard.
  - onImageClick — функция, которая будет вызвана при клике на изображение. 
Важно, что в данном случае onImageClick получает именно ту информацию, которая понадобится для открытия 
модального окна с подробной информацией об изображении.
  
  */

export default ImageGallery;
