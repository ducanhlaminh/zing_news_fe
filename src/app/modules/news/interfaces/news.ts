export interface Article {
    title: string;
    slug: string;
    slug_crc: number;
    content: string;
    sapo: string;
    avatar: string;
    views: number;
    publishAt: Date;
    status: number;
    created_user_id: number;
    createdAt: Date;
    updatedAt: Date;
    new_article: Article;
    new_articles_categories: Category;
    edit: boolean;
    selected: boolean;
    opened: boolean;
    User: any;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    slug_crc: number;
    parent_id: number;
    position: number;
    status: number;
    childCategories: Category[];
    updated_user_id: number;
    created_user_id: number;
    selected: boolean;
    opened: boolean;
    edit: boolean;
    createdAt: Date;
    updatedAt: Date;
}
