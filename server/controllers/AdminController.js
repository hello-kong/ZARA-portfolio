const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require("../helper/RegexHelper");
const AdminService = require("../services/AdminService");

module.exports = (() => {
    const url = "/admin";
    const router = express.Router();

    router.get(url, async (req, res, next) => {

        let json = null;

        try {
            json = await AdminService.getList();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

	router.get(`${url}/login`, async (req, res, next) => {

		if(req.session.login) {
			res.sendResult({data: true});
		} else {
			res.sendResult({data: false});
		}

    });


    router.post(url, async (req, res, next) => {
        const { email, password, name, tel } = req.body;

        try {
            regexHelper.value(email, "이메일이 없습니다.");
            regexHelper.value(password, "비밀번호가 없습니다.");
			regexHelper.value(name, "이름이 없습니다.");
			regexHelper.value(tel, "전화번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;
        let params = {
            email: email,
            password: password,
			name: name,
			tel: tel
        };

        try {
            json = await AdminService.addItem(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ data: json });
    });

	router.post(`${url}/login`, async (req, res, next) => {
        const { email, password } = req.body;

        try {
            regexHelper.value(email, "이메일이 없습니다.");
            regexHelper.value(password, "비밀번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;
        let params = {
            email: email,
            password: password,
        };

        try {
            json = await AdminService.getItem(params);
			req.session.login = json;
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

	router.delete(`${url}/:id`, async (req, res, next) => {
		const {id} = req.params;

		try {
			regexHelper.value(id, '삭제할 데이터 일련번호가 없습니다.');
		} catch (err) {
			return next(err);
		}

		try {
			await AdminService.deleteItem({id: id});
		} catch (err) {
			return next(err);
		}

		res.sendResult();
	});

    return router;
})();
