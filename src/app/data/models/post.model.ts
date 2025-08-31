
export interface Post { 
    id: number;
    title: string;
    slug: string;
    summary: string;
    author: string;
    publishedDate: Date;
    tags: string[];
    content?: string
}