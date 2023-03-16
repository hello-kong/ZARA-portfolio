const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require("../helper/RegexHelper");
const NoticeService = require("../services/NoticeService");
const { pagenation } = require("../helper/UtillHelper");
const dayjs = require("dayjs");

module.exports = (() => {
    const url = "/notice";
    const router = express.Router();

    router.get(url, async (req, res, next) => {
        const { title, content, nowpage = 1, listCount = 5 } = req.query;
		let pageInfo = null;

        let params = {};

        if (title) {
            params.title = title;
        } else if (content) {
            params.content = content;
        }

        let json = null;

        try {
            const totalCount = await NoticeService.getCount(params);
            pageInfo = pagenation(totalCount, nowpage, listCount);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;

            json = await NoticeService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagenation: pageInfo, data: json });
    });

    router.get(`${url}/:id`, async (req, res, next) => {
        const { id } = req.params;

        try {
            regexHelper.value(id, "공지사항 일련번호가 없습니다.");
            regexHelper.num(id, "공지사항 일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;

        try {
            json = await NoticeService.getItem({ id: id });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.post(url, async (req, res, next) => {
        const { title, content } = req.body;

        try {
            regexHelper.value(title, "제목이 없습니다.");
            regexHelper.value(content, "내용이 없습니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;
        let params = {
            title: title,
            content: content,
            reg_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            edit_date: dayjs().format("YYYY-MM-DD HH:mm:ss")
        };

        try {
            json = await NoticeService.addItem(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

	router.put(`${url}/:id`, async (req, res, next) => {
		const {id} = req.params;
		const {title, content} = req.body;

		try {
			regexHelper.value(id, '수정할 데이터 일련번호가 없습니다.');
			regexHelper.value(title, '제목이 없습니다.');
			regexHelper.value(content, '내용이 없습니다.');
		} catch (err) {
			return next(err);
		}

		let json = null;
		let params = {
			id: id,
			title: title,
			content: content,
			edit_date: dayjs().format("YYYY-MM-DD HH:mm:ss")
		};

		try {
			json = await NoticeService.editItem(params);
		} catch (err) {
			return next(err);
		}

		res.sendResult({data: json});
	});

	router.delete(`${url}/:id`, async (req, res, next) => {
		const {id} = req.params;

		try {
			regexHelper.value(id, '삭제할 데이터 일련번호가 없습니다.');
		} catch (err) {
			return next(err);
		}

		try {
			await NoticeService.deleteItem({id: id});
		} catch (err) {
			return next(err);
		}

		res.sendResult();
	});

    return router;
})();
