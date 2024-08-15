import Modal from "react-modal";
/* Импортируем два компонента - иконки из библиотеки react - icons.CiHeart - это иконка сердечка
  (обычно используется для отображения лайков), CiUser - иконка пользователя. */
import { CiHeart, CiUser } from "react-icons/ci";
import css from "./ImageModal.module.css";

/* Modal.setAppElement("#root") - это метод из библиотеки react/modal, который устанавливает основной элемент
вашего приложения (в данном случае, элемент с id root в котором обычно рендерится всё React-приложение.) в качестве
 элемента, к которому будет прикреплено модальное окно. */

Modal.setAppElement("#root");

/* Компонент, ImageModal отвечает за отображение модального окна */
const ImageModal = ({ modalState, onModalClose }) => {
  return (
    /* Используем компонент Modal из библиотеки react-modal, который автоматически создаёт модальное окно. */
    <Modal
      /* - применяем классы CSS для стилизации модального окна. */
      className={css.modal}
      /* - применяем классы CSS для стилизации фона, который затемняет остальную часть экрана. */
      overlayClassName={css.modalOverlay}
      /* контролируем, открыто или закрыто модальное окно. Это значение берётся из состояния modalState */
      isOpen={modalState.modalIsOpen}
      /* - указываем, какую функцию вызывать при попытке закрыть окно */
      onRequestClose={onModalClose}
    >
      {/*   Внутри модального окна отображаем изображение. URL картинки (src) и её
      альтернативное описание (alt) берутся из modalState. */}
      <img src={modalState.srcUrl} alt={modalState.altDescription} />
      {/*  Создаём список <ul>, который содержит информацию об авторе и количество лайков. */}
      <ul className={css.list}>
        {/*  В первом элементе списка <li> отображаем иконку пользователя и имя автора, которое берётся из modalState.authorName. */}
        <li className={css.item}>
          <CiUser size="20" />
          {modalState.authorName}
        </li>
        {/*    Во втором элементе списка <li> отображаем иконку сердечка и количество лайков, которое берётся из modalState.likes. */}
        <li className={css.item}>
          <CiHeart size="20" />
          {modalState.likes}
        </li>
      </ul>
      {/*  В параграфе <p> выводим подробное описание изображения, которое берётся из modalState.largeDescription. */}
      <p className={css.text}>{modalState.largeDescription}</p>
    </Modal>
  );
};

export default ImageModal;
