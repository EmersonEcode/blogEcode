import { Component, inject } from '@angular/core';
import { Post } from '../../../../data/models/post.model';
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';
import { PostCardSkeletonComponent } from "../../components/post-card-skeleton/post-card-skeleton.component";
import { CommonModule } from '@angular/common';
import { FeaturedCarouselComponent } from '../../components/featured-carousel/featured-carousel.component';
import { FeatureCarouselSkeletonComponent } from "../../components/feature-carousel-skeleton/feature-carousel-skeleton.component";
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, PostCardSkeletonComponent, CommonModule, FeaturedCarouselComponent, FeatureCarouselSkeletonComponent, RevealOnScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private postService = inject(PostService);
  posts$!: Observable<Post[]>;
  skeletonItems = Array(3).fill(0);
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  selectedTag: string | null = null;
  allTags: string[] = [];
  isLoading: boolean = true;



  ngOnInit(): void {

    this.postService.getPosts().subscribe(posts => { 
      this.allPosts = posts;  
      this.filteredPosts = posts;
      this.isLoading = false; 
    });

    this.postService.getUniqueTags().subscribe(tags => {
      this.allTags = tags;
    });

  }

  filterByTag(tag: string | null): void {
    this.selectedTag = tag;
    this.filteredPosts = tag ? this.allPosts.filter(post => post.tags.includes(tag)) : this.allPosts;
  }

  clearFilter(): void {
    this.filterByTag(null);
  }
}
