import { CommonModule } from '@angular/common';
import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../../../data/models/post.model';

import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-carousel.component.html',
  styleUrl: './featured-carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class FeaturedCarouselComponent implements  OnInit{


  private postService = inject(PostService);

  constructor() {
    register();
  }

  

  featuredPosts$!:  Observable<Post[]>;


  @ViewChild('swiperContainer') set swiperContainer(element: ElementRef<SwiperContainer>) {
    // Nós verificamos se o elemento realmente existe antes de fazer qualquer coisa.
    if (element) {
      const swiperParams: SwiperOptions = {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        pagination: { clickable: true },
        navigation: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
      };

      // Atribuímos os parâmetros ao elemento encontrado
      Object.assign(element.nativeElement, swiperParams);

      // E inicializamos o Swiper
      element.nativeElement.initialize();

      element.nativeElement.swiper.autoplay.start();
    }
  }

  ngOnInit(): void {
    this.featuredPosts$ = this.postService.getFeturedPosts();

  }



}


