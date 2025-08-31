import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-buttons',
  imports: [],
  templateUrl: './share-buttons.component.html',
  styleUrl: './share-buttons.component.scss'
})
export class ShareButtonsComponent implements OnInit {

  @Input() shareUrl: string = '';
  @Input() shareText: string = '';

  twitterShareUrl: string = '';
  facebookShareUrl: string = '';
  linkedinShareUrl: string = '';
  whatsappShareUrl: string = '';

  ngOnInit(): void {
      this.createShareLinks();
  }

  private createShareLinks(): void {

    const encodedUrl = encodeURIComponent(this.shareUrl);
    const encodedText = encodeURIComponent(this.shareText);

    this.twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    this.linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
    this.whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;


  }
  
 }
