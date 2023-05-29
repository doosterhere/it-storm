import { CategoryName } from "../../../types/categories.type";

export const Config = {
  bannersCarouselOptions: {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
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
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      850: {
        items: 2,
        margin: 24
      },
      1240: {
        items: 3
      },
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
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      image: 'service-01.png',
      category: CategoryName.design,
      price: 7500,
    },
    {
      title: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      image: 'service-02.png',
      category: CategoryName.smm,
      price: 3500
    },
    {
      title: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      image: 'service-03.png',
      category: CategoryName.target,
      price: 1000
    },
    {
      title: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      image: 'service-04.png',
      category: CategoryName.copyrighting,
      price: 750
    },
  ]
}
