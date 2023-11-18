export interface New {
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
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    slug_crc: number;
    parent_id: number;
    position: number;
    status: number;
    updated_user_id: number;
    created_user_id: number;
    selected: boolean;
    opened: boolean;
    edit: boolean;
    createdAt: Date;
    updatedAt: Date;
}
