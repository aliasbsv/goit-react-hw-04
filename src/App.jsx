import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ImageModal from "./components/ImageModal";
import { useState, useEffect, useRef } from "react";
import getImages from "./components/unsplash";
import toast from "react-hot-toast";
import "./App.css";

//начальное значение состояния, которое задает исходные параметры модального окна, когда компонент только загружается.
const MODAL_INITIAL_STATE = {
  modalIsOpen: false, //модальное окно  должно быть закрыто по умолчанию.
  srcUrl: "", //URL изображения, которое будет отображено в модальном окне
  altDescription: "", //альтернативное описание изображения
  authorName: "", //имя автора изображения.
  likes: "", //количество лайков
  largeDescription: "", //более подробное описание
};

function App() {
  const [search, setSearch] = useState(""); //Создаем состояние search, которое будет хранить строку поиска.
  const [page, setPage] = useState(1); //Состояние page хранит текущую страницу результатов поиска.
  const [images, setImages] = useState([]); //Состояние images хранит массив изображений, полученных по результатам поиска.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [modalState, setModalState] = useState(MODAL_INITIAL_STATE); //хранится текущее состояние модального окна
  const mainElem = useRef();

  /* Функция handleSearch будет вызвана при каждом новом поисковом запросе. */
  const handleSearch = (newSearch) => {
    setSearch(newSearch); //Обновляем состояние search новым значением newSearch поступившим из формы.
    setPage(1); //Сбрасываем номер страницы на 1 при новом поиске.
    setImages([]); //Очищаем массив изображений, чтобы начать новый поиск с нуля.
  };

  /* функция увеличивает номер текущей страницы(page) на единицу каждый раз, когда пользователь нажимает кнопку "Load more".
  Значение page используется для того, чтобы загружать следующую порцию данных (например, следующую страницу изображений) с 
  сервера. Когда page меняется, срабатывает useEffect, который отвечает за загрузку данных. То есть, при изменении page,
   useEffect снова запускает запрос к серверу, но уже для новой страницы данных. */
  const handleLoadMoreBtn = () => {
    setPage(page + 1);
  };

  /* - handleModalOpen -  это функция, которая будет открывать модальное окно с подробной информацией о изображении.
     - setModalState устанавливает новое состояние модального окна:
   Когда вызывается setModalState, React обновляет компонент и перерисовывает его с новым значением состояния.
    Это приведет к тому, что модальное окно откроется и в нем отобразится информация об изображении. */
  const handleModalOpen = (
    srcUrl,
    altDescription,
    authorName,
    likes,
    largeDescription
  ) => {
    setModalState({
      modalIsOpen: true, // модальное окно теперь должно быть открыто.
      srcUrl,
      altDescription,
      authorName,
      likes,
      largeDescription,
    });
  };

  const handleModalClose = () => {
    setModalState(MODAL_INITIAL_STATE);
  };

  /*  Хук useEffect  срабатывает, когда изменяются указанные зависимости (в данном случае search и page). */
  useEffect(() => {
    async function getImagesData() {
      try {
        /*  setError(false) устанавливает значение error в false перед выполнением запроса.Это делается для того, чтобы убедиться,
          что до начала запроса приложение считает, что никаких ошибок нет. */
        setError(false);

        /*  Сначала функция проверяет, есть ли в search строка для поиска. Если search пустой, то запрос не выполняется, 
          а кнопка "Load more" скрывается (setShowLoadMoreBtn(false)). Если search не пустой, то начинается 
          загрузка(setLoading(true)), и отправляется запрос на сервер(getImages(search, page)). */

        if (search === "") {
          setShowLoadMoreBtn(false);
          return;
        }
        /*  Перед началом загрузки данных(getImages) переменная loading устанавливается в true
          (setLoading(true)), чтобы показать, что начался процесс загрузки. */
        setLoading(true);

        /*  Эта строка ждет ответа от сервера. После получения данных, они сохраняются в переменной data. */
        const data = await getImages(search, page);
        /*   Если данных не найдено, функция сообщает об этом (например, с помощью toast) и скрывает кнопку "Load more". */
        if (data.total === 0) {
          setShowLoadMoreBtn(false);
          toast("There are no results!");
          return;
        }
        /* Если данные найдены, они добавляются к текущему массиву изображений.
        - prevImages — это массив изображений, который был в состоянии images до обновления. То есть это текущий список изображений,
         уже отображаемых на странице  
         - data.results — это масив данных, которые мы получаем от сервера в ответ на наш запрос*/
        setImages((prevImages) => [...prevImages, ...data.results]);

        /* ...и проверяется, есть ли еще страницы для загрузки, тогда кнопка Загрузить еще видна. Нет больше? - кнопка скрыта. 
        data.total_pages — это общее количество страниц, доступных на сервере. То есть, сколько всего страниц с изображениями существует.
        page — это текущий номер страницы, которую мы сейчас показываем. */
        setShowLoadMoreBtn(data.total_pages !== page);

        /*   Когда ошибка поймана, вызывается setError(true), что устанавливает состояние error в true.
        Это сигнализирует приложению, что произошла ошибка. */
      } catch (error) {
        setError(true);
      } finally {
        /* Когда загрузка данных завершена(или произошла ошибка), loading устанавливается в false
          (setLoading(false)), чтобы скрыть лоадер. */
        setLoading(false);
      }
    }
    getImagesData();
  }, [search, page]);

  /* Хук управляет прокруткой страницы */
  useEffect(() => {
    if (page === 1) return;
    /* Это означает, что прокрутка страницы будет выполнена только если страница больше 1.
    Следующая строка прокручивает элемент mainElem в область видимости.
    - mainElem.current - это ссылка на элемент, который мы хотим прокрутить. Она создается с помощью useRef, 
    который используется для доступа к DOM элементам. 
    - scrollIntoView — метод, который прокручивает элемент в видимую область браузера.*/
    mainElem.current.scrollIntoView({ behavior: "smooth", block: "end" });
    /*  - behavior: "smooth" означает, что прокрутка будет плавной, а block: "end" указывает, что элемент должен быть внизу видимой области. */
  }, [images, page]);

  return (
    <div ref={mainElem}>
      <SearchBar onSearch={handleSearch} />

      {/* если error = true (то есть произошла ошибка), то в разметке
      отображается компонент ErrorMessage. */}
      {error && <ErrorMessage />}

      {/* массив изображений, которые нужно отобразить в галерее и функция handleModalOpen
      которая будет вызываться при клике на изображение */}
      <ImageGallery images={images} onImageClick={handleModalOpen} />

      {/* Если showLoadMoreBtn равно true (тоесть на сервере еще есть данные, которые можно еще загрузить) 
      и loading равно false (кнопка "Load more" не должна отображаться, если идет процесс загрузки (loading равно true))
      то покажи компонент LoadMoreBtn.  */}
      {showLoadMoreBtn && !loading && (
        /* Когда пользователь нажимает на кнопку "Load more", вызывается функция handleLoadMoreBtn, которая, скорее всего,
      увеличивает номер страницы и инициирует загрузку новых данных. */
        <LoadMoreBtn onLoadMoreBtn={handleLoadMoreBtn} />
      )}

      {/*  Если loading true, то покажи Loader- загрузчик  */}
      {loading && <Loader />}

      {/*      - onModalClose: Функция, которая будет вызвана при закрытии модального окна.
         - modalState: Объект, содержащий текущее состояние модального окна. */}
      <ImageModal onModalClose={handleModalClose} modalState={modalState} />
    </div>
  );
}

export default App;

/* 
***********************************ЛОГИКА РАБОТЫ КНОПКИ "Load more"***********************************************

    Например у нас есть 3 страницы изображений, и на каждой странице по 12 изображений. Когда пользователь впервые заходит на сайт:
    начальное состояние: page равно 1. Мы показываем кнопку "Load more".

    1. Пользователь нажимает "Load more":
        - Мы загружаем 12 изображений с первой страницы.
        - Затем увеличиваем page на 1, так что она становится равной 2.
        - Добавляем новые изображения к уже загруженным.

    2. Проверяем наличие следующей страницы:
        - Если data.total_pages (3) не равно текущей странице (page, которая равна 2), то есть еще страницы для загрузки.
        - Мы устанавливаем showLoadMoreBtn в true, и кнопка "Load more" продолжает отображаться. Пользователь нажимает "Load more":

    3. Мы загружаем 12 изображений со второй страницы.
        - Увеличиваем page на 1, так что она становится равной 3.
        - Добавляем новые изображения к текущему массиву.

    4.Проверяем наличие следующей страницы:
        - Если data.total_pages (3) не равно текущей странице (page, которая равна 3), то есть еще страницы для загрузки.
        - Мы устанавливаем showLoadMoreBtn в false, потому что больше нет страниц для загрузки. 
****************************************************************************************************************

***************************************ЗАГРУЗКА ДАННЫХ С СЕРВЕРА************************************************
        
        Например у нас есть состояние images, которое изначально пусто:

    Первый запрос:
        Мы загружаем изображения для первой страницы. Пусть они будут: ['img1', 'img2', 'img3'].
        prevImages будет равен [] (поскольку в начале массив пустой).
        data.results будет равен ['img1', 'img2', 'img3'].

    После выполнения:
        Новый массив будет: [...prevImages, ...data.results] — это будет ['img1', 'img2', 'img3'].
        Состояние images обновится и теперь содержит эти три изображения.

    Второй запрос:
        Вы загружаете изображения для второй страницы. Пусть это будут: ['img4', 'img5', 'img6'].
        Теперь prevImages будет равен ['img1', 'img2', 'img3'] (текущие изображения).
        data.results будет равен ['img4', 'img5', 'img6'] (новые изображения).

    После выполнения:
        Новый массив будет: [...prevImages, ...data.results] — это будет ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'].
        Состояние images обновится и теперь содержит все шесть изображений.

Таким образом, prevImages — это старые данные, а data.results — это новые данные, которые мы добавляем к существующим.
*********************************************************************************************************************


****************************ПРИМЕР РАБОТЫ ПРОКРУТКИ:***********************************

    Начальное состояние:
        page равно 1.
        Когда страница только загружается (и page равно 1), ничего не происходит, и прокрутка не выполняется.

    Нажимаешь "Load more":
        Новые изображения загружаются, и page увеличивается до 2.
        useEffect срабатывает, потому что page изменился.

    Прокрутка:
        Если текущая страница больше 1, то mainElem.current.scrollIntoView({ behavior: "smooth", block: "end" }); будет выполнен.
        Это прокручивает страницу вниз, чтобы пользователь увидел последние загруженные изображения.

    Пример:
        Ты находишься на странице 1, видишь первые 12 изображений.
        Нажимаешь "Load more", загружаются изображения страницы 2.
        page увеличивается до 2. useEffect срабатывает.
        Страница плавно прокручивается вниз, чтобы ты увидел новые изображения, которые загрузились.

    Если бы не было прокрутки, тебе нужно было бы вручную прокручивать страницу вниз, чтобы увидеть новые изображения.
     Этот код автоматизирует процесс, чтобы пользователю было удобнее просматривать загруженные изображения без дополнительного действия.

*************************************************************************************************************************************
*/
