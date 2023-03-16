const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require("../helper/RegexHelper");
const fileHelper = require("../helper/FileHelper");
const ProductService = require("../services/ProductService");
const { pagenation } = require("../helper/UtillHelper");
const dayjs = require("dayjs");

module.exports = (() => {
    const url = "/product";
    const router = express.Router();

    router.get(url, async (req, res, next) => {
        const { search, depth2, nowpage = 1, listCount = 10 } = req.query;
        let pageInfo = null;

        let params = {};

        if (search) {
            params.search = search;
        }
        if (depth2) {
            params.depth2 = depth2;
        }

        let json = null;

        try {
            const totalCount = await ProductService.getCount(params);
            pageInfo = pagenation(totalCount, nowpage, listCount);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;

            json = await ProductService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagenation: pageInfo, data: json });
    });

    router.get(`${url}/:id`, async (req, res, next) => {
        const { id } = req.params;

        try {
            regexHelper.value(id, "상품 일련번호가 없습니다.");
            regexHelper.num(id, "상품 일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;

        try {
            json = await ProductService.getDetail({ product_id: id });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.get("/category", async (req, res, next) => {
        let json = null;

        try {
            json = await ProductService.getCg();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.post(url, async (req, res, next) => {
        const { name, price, dsc, use_amount, depth2_id, color, size, file } = req.body;

        try {
            regexHelper.value(name, "상품 이름이 없습니다.");
            regexHelper.value(price, "상품 가격이 없습니다.");
            regexHelper.value(depth2_id, "카테고리 종류가 없습니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;
        let params = {
            name: name,
            price: price,
            reg_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            dsc: dsc,
            use_amount: use_amount || "Y",
            depth2_id: depth2_id,
        };

        try {
            json = await ProductService.addProduct(params);
            if (size.length !== 0) {
                size.forEach(async (v, i) => {
                    await ProductService.addDetail({
                        product_id: json.id,
                        color: color || null,
                        size: v,
                        use_amount: "Y",
                        reg_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    });
                });
            }
            if (file.length !== 0) {
                file.forEach(async (v, i) => {
                    await ProductService.addImg({
                        product_id: json.id,
                        color: v.color,
                        path: v.path,
                        origin_name: v.origin_name,
                    });
                });
            }
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.post(`${url}/:id`, async (req, res, next) => {
        const { id } = req.params;
        const { color, size } = req.body;

        let json = null;

        try {
            json = await size.forEach((v, i) => {
                ProductService.addDetail({
                    product_id: id,
                    color: color || null,
                    size: v,
                    use_amount: "Y",
                    reg_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                });
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.post(`${url}img`, async (req, res, next) => {
        req.file = [];

        const upload = fileHelper.initMulter().array("product");

        upload(req, res, (err) => {
            try {
                fileHelper.checkUploadError(err);
            } catch (err) {
                return next(err);
            }

            res.sendResult({ data: req.file });
        });
    });

    router.post("/category", async (req, res, next) => {
        const { depth1, depth2, depth1_id } = req.body;

        let json = null;

        try {
            if (depth1 !== null && depth1 !== undefined && depth1 !== "") {
                json = await ProductService.addCg1({
                    depth1: depth1,
                });
            }
            if (depth1_id && depth2 !== null && depth2 !== undefined && depth2 !== "") {
                json = await ProductService.addCg2({
                    depth1_id: depth1_id,
                    depth2: depth2,
                });
            }
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.put(`${url}/:id`, async (req, res, next) => {
        const { id } = req.params;
        const { name, price, dsc, use_amount, depth2_id, color, size, detail_id, file } = req.body;

        try {
            regexHelper.value(id, "수정할 데이터 일련번호가 없습니다.");
            regexHelper.value(name, "상품 이름이 없습니다.");
            regexHelper.value(price, "상품 가격이 없습니다.");
            regexHelper.value(depth2_id, "카테고리 종류가 없습니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;
        let params = {
            id: id,
            name: name,
            price: price,
            dsc: dsc,
            use_amount: use_amount,
            depth2_id: depth2_id,
        };

        try {
            await ProductService.editProduct(params);
            if (detail_id) {
                await ProductService.editDetail({
                    detail_id: detail_id,
                    size: size,
                    color: color,
                });
            }
            if (file.length !== 0) {
                file.forEach(async (v, i) => {
                    await ProductService.addImg({
                        product_id: json.id,
                        color: v.color,
                        path: v.path,
                        origin_name: v.origin_name,
                    });
                });
            }
            json = await ProductService.getDetail({ product_id: id });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.put("/category", async (req, res, next) => {
        const { depth1, depth2, depth1_id, depth2_id } = req.body;

        let json = null;

        try {
            if (depth1 && depth1_id) {
                json = await ProductService.editCg1({
                    id: depth1_id,
                    depth1: depth1,
                });
            }

            if (depth2 && depth2_id) {
                json = await ProductService.editCg2({
                    id: depth2_id,
                    depth1: depth2,
                });
            }
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.delete(`${url}/:id`, async (req, res, next) => {
        const { id } = req.params;
        const { color } = req.body;

        try {
            regexHelper.value(id, "삭제할 데이터 일련번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            if (color) {
                await ProductService.deleteDetail({ id: id, color: color });
                await ProductService.deleteImg({ id: id, color: color });
            } else {
                await ProductService.deleteProduct({ id: id });
            }
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: id });
    });

    router.delete(`${url}img/:id`, async (req, res, next) => {
        const { id } = req.params;
        const { color } = req.body;

        try {
            regexHelper.value(id, "삭제할 데이터 일련번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await ProductService.deleteImg({ id: id, color: color });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    router.delete("/category", async (req, res, next) => {
        const { depth1_id, depth2_id } = req.body;

        let json = null;

        try {
            if (depth2_id !== null && depth2_id !== undefined && depth2_id !== "" && !isNaN(depth2_id)) {
                await ProductService.deleteCg2({ id: depth2_id });
            } else if (!depth2_id && depth1_id !== null && depth1_id !== undefined && depth1_id !== "" && !isNaN(depth1_id)) {
                await ProductService.deleteCg1({ id: depth1_id });
            }
            json = await ProductService.getCg();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    return router;
})();
