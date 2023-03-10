import { Component } from '@angular/core';

import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  };
  readonly slidesContent = [
    {
      preTitle: 'Предложение месяца',
      title: 'Продвижение в Instagram для вашего бизнеса -15%!',
      text: '',
      buttonCustomMargin: true
    },
    {
      preTitle: 'Акция',
      title: 'Нужен грамотный копирайтер?',
      text: 'Весь декабрь у нас действует акция на работу копирайтера.',
      buttonCustomMargin: false
    },
    {
      preTitle: 'Новость дня',
      title: '6 место в ТОП-10 SMM-агенств Москвы!',
      text: 'Мы благодарим каждого, кто голосовал за нас!',
      buttonCustomMargin: false
    },
  ];

}
