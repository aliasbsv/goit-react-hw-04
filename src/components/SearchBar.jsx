import toast, { Toaster } from "react-hot-toast";
import { RxMagnifyingGlass } from "react-icons/rx";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const search = form.elements.searchInput.value.trim();

    if (search === "") {
      toast.error("Please enter text to search for images");
      return;
    }
    onSearch(search);
    form.reset();
  };
  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      {/* Компонент  Toaster отображает  уведомления на экране. */}
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchInput"
        />
        <button className={css.btn} type="submit">
          <RxMagnifyingGlass />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
