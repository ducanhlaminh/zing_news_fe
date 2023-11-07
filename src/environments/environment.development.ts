export const environment = {
    API_CATEGORY_GET_ALL: "http://localhost:4000/api/v1/categories/get-all",
    API_CATEGORY_GET_SUB_CATE:
        "http://localhost:4000/api/v1/categories/sub-cate/",
    API_CATEGORIES_BY_NAME: "http://localhost:4000/api/v1/categories/",

    API_NEWS_HOT_MAIN: "http://localhost:4000/api/v1/articles/hot-main/",
    API_BOOKS: "http://localhost:4000/api/v1/articles/books",
    API_NEW_ARTCLES_MAIN: "http://localhost:4000/api/v1/articles/publish_at",
    API_NEW_ARTCLES_CATE: "http://localhost:4000/api/v1/articles/publish_at/",
    API_NEW_ARTCLES_TITLE: "http://localhost:4000/api/v1/articles/title",
    API_ARTICLES_VIEWS: "http://localhost:4000/api/v1/articles/views",
    API_ARTICLES_HOT_CATE: "http://localhost:4000/api/v1/articles/hot-cate",
    API_BOX_ARTICLES_CARTEGORY:
        "http://localhost:4000/api/v1/articles/box-category",
    API_TOKEN_GG: "http://localhost:4000/api/v1/auth/login-success/",
    API_GET_INFOR_USER: "http://localhost:4000/api/v1/users/get-data",
    API_LOGIN_GG: "http://localhost:4000/api/v1/auth/google",
    API_GET_DETAIL: "http://localhost:4000/api/v1/articles/detail/",
    API_GET_AVATAR: "http://localhost:4000/api/v1/articles/avatar?slug_crc=",

    //API ADMIN
    API_ADMIN_HOT_MAIN: "http://localhost:4000/api/v1/articles/admin/hot-main",
    API_ADMIN_HOT_CATE: "http://localhost:4000/api/v1/articlesadmin/hot-cate",
    API__ADMIN_ARTICLE: "http://localhost:4000/api/v1/articles/admin/articles",
    API_CATEGORY_GET_ALL_ADMIN:
        "http://localhost:4000/api/v1/categories/admin/get-all",
    API_ADMIN_CATEGORY_DELETE: "http://localhost:4000/api/v1/categories/admin",
    API_ADMIN_USER: "http://localhost:4000/api/v1/user/admin/user",
    API_ARTICLES_HOT_ADMIN:
        "http://localhost:4000/api/v1/articles/admin/hot-news",
};
export const configRole = [
    {
        name: "Superadmin",
        role_id: 1,
        coloumns: {
            title: true,
            author: true,
            category: true,
            date: true,
            views: true,
        },
    },
    {
        name: "Editor",
        role_id: 2,
        coloumns: {
            title: true,
            author: false,
            category: true,
            date: true,
            views: true,
        },
    },
];
