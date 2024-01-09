import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Buffer } from "buffer";
import * as forge from "node-forge";
@Injectable({
    providedIn: "root",
})
export class NewsService {
    constructor(public http: HttpClient) {}
    dataPreview: any;
    publicKey = `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFubHlETWI1VHoxZy9XMk1RY08yWQpVYitadDI2Nk4yT1RiaVV5OWRxQm1kd214c001Vys2NmU5ZjBuTHQ5VlBmUzFZRUs0QjEvQW9BM0pVbnBOaWI0CnZHcjQ2NGF2SkRpZVN5U25tR2syZlFzb2xQaFU0d2dScjQrN04yMEU1b2N3VXNzSm5xb3hHdk9odlF2ZVRadjcKdy81T0cyYkYrNXg0dTYzY2gzS3F4cHp3TCsrZzR5NjIrRmU2TklxUVI5QjRnT1Z0YTJpSmVxOTV4eEUyeXp6Mwp2NUJxK2hvc0hxZ08ycmcveWRTR0lWSVZaMnhKdVhQTXF4V2RJMy9pUXhkWnZYTDdlQmtuZUVENzlNRzBnOW5rCmtaZHh4dGtFc2I3cnZEL0ROUWo4aEd1MERzMGVFMkp6Y2dpL1FOREQrTUFIaVNrMGRGdlZxZStBangzVTNLVzIKM3dJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t`;

    encryptRequest(e: any) {
        try {
            const n = forge.random.getBytesSync(32);
            const t = forge.random.getBytesSync(16);

            const i = forge.cipher.createCipher("AES-CTR", n);
            i.start({
                iv: t,
            }),
                i.update(forge.util.createBuffer(JSON.stringify(e))),
                i.finish();
            const r = Buffer.concat([
                Buffer.from(t, "binary"),
                Buffer.from(i.output.data, "binary"),
            ]);
            const s = forge.pki
                .publicKeyFromPem(forge.util.decode64(this.publicKey))
                .encrypt(forge.util.encode64(n));
            return {
                d: r.toString("base64"),
                k: forge.util.encode64(s),
            };
        } catch (n) {
            console.log(n);
            return e;
        }
    }
    getHotMain() {
        return this.http.get(environment.API_NEWS_HOT_MAIN);
    }
    getBooks() {
        return this.http.get(environment.API_BOOKS);
    }
    getNewArtclesMain(page: number = 1) {
        return this.http.get(environment.API_NEW_ARTCLES_MAIN, {
            params: { page },
        });
    }
    getNewArtclesCate(slug_crc: string, page: number = 1) {
        return this.http.get(environment.API_NEW_ARTCLES_CATE, {
            params: { slug_crc, page },
        });
    }
    getArticlesByTitle(category_id: any, title: string, page: number = 1) {
        if (category_id === "") {
            return this.http.get(environment.API_NEW_ARTCLES_TITLE, {
                params: { title, page },
            });
        } else {
            return this.http.get(environment.API_NEW_ARTCLES_TITLE, {
                params: { title, category_id, page },
            });
        }
    }
    getArticlesView(slug_crc: string = "") {
        if (slug_crc !== "") {
            return this.http.get(environment.API_ARTICLES_VIEWS, {
                params: { slug_crc },
            });
        }
        return this.http.get(environment.API_ARTICLES_VIEWS);
    }
    getArtclesHotCate(slug_crc: string) {
        if (slug_crc) {
            return this.http.get(environment.API_ARTICLES_HOT_CATE, {
                params: { slug_crc },
            });
        } else {
            return this.http.get(environment.API_ARTICLES_HOT_CATE, {});
        }
    }
    getArtclesHotAdmin(slug_crc: string) {
        if (slug_crc) {
            return this.http.get(environment.API_ARTICLES_HOT_ADMIN, {
                params: { slug_crc },
            });
        } else {
            return this.http.get(environment.API_ARTICLES_HOT_ADMIN);
        }
    }
    getDetail(slug: string, slug_crc: string) {
        return this.http.get(
            environment.API_GET_DETAIL + slug + "/" + slug_crc
        );
    }
    createArticle(data: any) {
        return this.http.post(environment.API__ADMIN_ARTICLE, data);
    }
    updateArticle(data: any = "", id: any) {
        if (Array.isArray(id)) {
            const params = JSON.stringify(id);

            return this.http.put(
                environment.API__ADMIN_ARTICLE,
                {
                    data,
                },
                { params: { id } }
            );
        }
        return this.http.put(
            environment.API__ADMIN_ARTICLE,
            {
                data,
            },
            { params: { id } }
        );
    }
    deleteArticle(id: any) {
        const params = JSON.stringify(id);

        return this.http.delete(environment.API__ADMIN_ARTICLE, {
            params: { id: params },
        });
    }
    getAllByAd(data: any) {
        return this.http.get(environment.API__ADMIN_ARTICLE, {
            params: { ...data },
        });
    }
    deleteHotMain(data: any) {
        return this.http.delete(environment.API_ADMIN_HOT_MAIN, {
            params: { ...data },
        });
    }
    createHotMain(data: any) {
        return this.http.post(environment.API_ADMIN_HOT_MAIN, {
            data,
        });
    }
    updateHotMain(data: any) {
        return this.http.put(environment.API_ADMIN_HOT_MAIN, data);
    }
    updateArtclesHotCate(data: any, category_id: any) {
        return this.http.put(
            environment.API_ADMIN_HOT_CATE + "/" + category_id,
            data
        );
    }
    createArtclesHotCate(articles: any, category_id: any) {
        if (category_id) {
            return this.http.post(environment.API_ARTICLES_HOT_ADMIN, {
                articles,
                category_id,
            });
        } else {
            return this.http.post(environment.API_ARTICLES_HOT_ADMIN, {
                articles,
            });
        }
    }
    deleteHotCate(data: any) {
        return this.http.delete(environment.API_ADMIN_HOT_CATE, {
            params: { ...data },
        });
    }
    getBoxArticlesCategory(data: any = null) {
        if (data) {
            return this.http.get(environment.API_BOX_ARTICLES_CARTEGORY, {
                params: { slug_crc: data },
            });
        } else {
            return this.http.get(environment.API_BOX_ARTICLES_CARTEGORY);
        }
    }
    saveData(data: any) {
        console.log(data);

        return this.http.post(
            "http://localhost:4000/api/v1/articles/save-data",
            data
        );
    }
}
