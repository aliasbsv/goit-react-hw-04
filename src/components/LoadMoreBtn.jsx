import css from "./LoadMoreBtn.module.css";
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
