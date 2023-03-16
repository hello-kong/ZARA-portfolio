const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require("../helper/RegexHelper");
const QnaService = require("../services/QnaService");
const { pagenation } = require("../helper/UtillHelper");
const dayjs = require("dayjs");

module.exports = (() => {
    const url = "/qna";
    const router = express.Router();

    router.get(url, async (req, res, next) => {
        const { name, title, content, isNull, nowpage = 1, listCount = 5 } = req.query;
        let pageInfo = null;

        let params = {};

        if (name) {
            params.name = name;
        } else if (title) {
            params.title = title;
        } else if (content) {
            params.content = content;
        } else if (isNull) {
			params.isNull = isNull;
		}

        let json = null;

        try {
            const totalCount = await QnaService.getCount(params);
            pageInfo = pagenation(totalCount, nowpage, listCount);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;

            json = await QnaService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagenation: pageInfo, data: json });
    });

    router.get(`${url}/:id`, async (req, res, next) => {
        const { id } = req.params;

        try {
            regexHelper.value(id, "문의사항 일련번호가 없습니다.");
            regexHelper.num(id, "문의사항 일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;

        try {
            json = await QnaService.getItem({ id: id });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.post(url, async (req, res, next) => {
        const { title, content, qna_type, members_id } = req.body;

        try {
            regexHelper.value(title, "제목이 없습니다.");
            regexHelper.value(content, "내용이 없습니다.");
            regexHelper.value(qna_type, "문의 종류가 없습니다.");
            regexHelper.value(members_id, "작성한 사람의 일련번호가 없습니다.");
            regexHelper.num(
                members_id,
                "작성한 사람의 일련번호가 잘못되었습니다."
            );
        } catch (err) {
            return next(err);
        }

        let json = null;
        let params = {
            title: title,
            content: content,
            reg_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            edit_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            qna_type: qna_type,
            answer: null,
            answer_date: null,
            members_id: members_id,
        };

        // 업로드 한 파일이 있을 경우 처리 예정

        try {
            json = await QnaService.addItem(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.put(`${url}/:id`, async (req, res, next) => {
        const { id } = req.params;
        const { title, content, qna_type, answer } = req.body;

        try {
            regexHelper.value(id, "수정할 데이터 일련번호가 없습니다.");

            if (!answer) {
                regexHelper.value(title, "제목이 없습니다.");
                regexHelper.value(content, "내용이 없습니다.");
                regexHelper.value(qna_type, "문의 종류가 없습니다.");
            }
        } catch (err) {
            return next(err);
        }

        let json = null;
        let params = {
            id: id,
            title: title,
            content: content,
            qna_type: qna_type,
            edit_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        };

        if (answer) {
            params.answer = answer;
            params.answer_date = dayjs().format("YYYY-MM-DD HH:mm:ss");
        }

        try {
            if (answer) {
                json = await QnaService.editAnswer(params);
            } else {
                json = await QnaService.editItem(params);
            }
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

    router.delete(`${url}/:id`, async (req, res, next) => {
        const { id } = req.params;

        try {
            regexHelper.value(id, "삭제할 데이터 일련번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await QnaService.deleteItem({ id: id });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
