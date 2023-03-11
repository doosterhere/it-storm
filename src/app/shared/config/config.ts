import { CategoryName } from "../../../types/categories.type";

export const Config = {
  bannersCarouselOptions: {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin: 0,
    navSpeed: 700,
    items: 1,
    nav: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayMouseleaveTimeout: 2000,
    autoplayTimeout: 5000,
    autoplaySpeed: 1200
  },
  feedbacksCarouselOptions: {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 24,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  },
  bannersCarouselSlidesContent: [
    {
      preTitle: 'Предложение месяца',
      title: 'Продвижение в Instagram для вашего бизнеса <span>-15%</span>!',
      text: '',
      image: 'image-01.png',
      buttonCustomMargin: true,
      category: CategoryName.target
    },
    {
      preTitle: 'Акция',
      title: 'Нужен грамотный <span>копирайтер</span>?',
      text: 'Весь декабрь у нас действует акция на работу копирайтера.',
      image: 'image-02.png',
      buttonCustomMargin: false,
      category: CategoryName.copyrighting
    },
    {
      preTitle: 'Новость дня',
      title: '<span>6 место</span> в ТОП-10<br>SMM-агенств Москвы!',
      text: 'Мы благодарим каждого, кто голосовал за нас!',
      image: 'image-03.png',
      buttonCustomMargin: false,
      category: CategoryName.smm
    },
  ],
  feedbacksCarouselSlidesContent: [
    {
      image: 'feedback-01.png',
      name: 'Станислав',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      image: 'feedback-02.png',
      name: 'Алёна',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      image: 'feedback-03.png',
      name: 'Мария',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
  ],
  servicesCardsContent: [
    {
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 7500,
      image: 'service-01.png',
      category: CategoryName.design
    },
    {
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 3500,
      image: 'service-02.png',
      category: CategoryName.smm
    },
    {
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 1000,
      image: 'service-03.png',
      category: CategoryName.target
    },
    {
      title: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 750,
      image: 'service-04.png',
      category: CategoryName.copyrighting
    },
  ]
}
