import css from "./LoadMoreBtn.module.css";
/* компонент LoadMoreBtn, который принимает пропс onLoadMoreBtn. Этот пропс — это функция, которая будет вызвана
  , когда пользователь кликнет на кнопку "Load more". */
const LoadMoreBtn = ({ onLoadMoreBtn }) => {
  return (
    <>
      <button className={css.btn} type="button" onClick={onLoadMoreBtn}>
        Load more
      </button>
    </>
  );
};

export default LoadMoreBtn;
