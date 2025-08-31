import { Component, inject, Input, OnInit } from '@angular/core';
import { Post } from '../../../../data/models/post.model';
import { RouterLink, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink, DatePipe, MatIconModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
    @Input() post!: Post;
}
