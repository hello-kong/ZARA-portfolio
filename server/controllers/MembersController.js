const express = require('express');
const logger = require('../helper/LogHelper');
const regexHelper = require('../helper/RegexHelper');
const MembersService = require('../services/MembersService');

const { pagenation } = require("../helper/UtillHelper");
const dayjs = require("dayjs");

module.exports = (() => {
	const url = '/members';
	const router = express.Router();

	router.get(url, async (req, res, next) => {
        const { name, email, nowpage = 1, listCount = 5 } = req.query;

        let params = {};
		let pageInfo = null;
		
        if (name) {
            params.name = name;
        } else if (email) {
            params.email = email;
		}

        let json = null;

        try {
            const totalCount = await MembersService.getCount(params);
            pageInfo = pagenation(totalCount, nowpage, listCount);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;

            json = await MembersService.getList({params});

			



        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagenation: pageInfo, data: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:id`, async (req, res, next) => {
        // 파라미터 받기
        const { id } = req.params;

        // 파라미터 유효성 검사
        try {
            regexHelper.value(id, 'id가 없습니다.');
        } catch (err) {
            return next(err);
        }

        // 데이터 조회
        let json = null;
         
        try {
            json = await MembersService.getItem({id: 6});
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });


	router.post(url, async (req, res, next) => {
		const {name, email, password, gender, birthdate, tel, postcode, roadaddr, detailaddr} = req.body;

		try {
			regexHelper.value(name, '이름이 없습니다.');
			regexHelper.value(email, '이메일이 없습니다.');
			regexHelper.value(password, '비밀번호가 없습니다.');
			regexHelper.value(birthdate, '생년월일이 없습니다.');
			regexHelper.value(tel, '전화번호가 없습니다.');
		} catch (err) {
			return next(err);
		}

		let json = null;

		try {
			json = await MembersService.addItem({
				name: name,
				email: email,
				password: password,
				gender: gender || null,
				birthdate: dayjs(birthdate).format(),
				tel: tel,
				postcode: postcode || null,
				roadaddr: roadaddr || null,
				detailaddr: detailaddr || null,
				reg_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
				edit_date: dayjs().format('YYYY-MM-DD HH:mm:ss')
			});
		} catch (err) {
			return next(err);
		}

		res.sendResult({data: json});
	});

	router.put(`${url}/:id`, async (req, res, next) => {
        // 파라미터 받기
        const { id } = req.params;
        const { name, postcode, roadaddr, detailaddr, tel, company, crn } = req.body;

        // 유효성 검사
        try {
            regexHelper.value(id, '수정할 주소가 없습니다.');
            regexHelper.num(id, '수정할 주소의 번호가  잘못되었습니다.');
            regexHelper.value(name, '이름을 입력하십시오.');
            regexHelper.maxLength(name, 20, '이름은 최대 20자까지 입력 가능합니다.');
            regexHelper.kor(name, '이름은 한글로만 입력 가능합니다.');
            regexHelper.value(postcode, '우편번호를 입력하십시오.');
            regexHelper.num(postcode, '우편번호는 숫자만 가능합니다.');
            regexHelper.maxLength(postcode, 5, '우편번호 최대 5자로 입력 가능 합니다.');
            regexHelper.value(roadaddr, '주소를 입력하십시오.');
            regexHelper.korNum(roadaddr, '주소1은 한글과 숫자로만 입력가능합니다.');
            regexHelper.korNum(detailaddr, '주소2는 한글과 숫자로만 입력하능합니다.');
            regexHelper.value(tel, '전화번호를 입력하십시오.');
            regexHelper.phone(tel, '전화번호 형식이 올바르지 않습니다.');

        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await MembersService.editItem({
                id: id,
                name: name,
                postcode: postcode,
                roadaddr: roadaddr,
                detailaddr: detailaddr,
                tel: tel,
                company: company,
                crn: crn,

            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

	return router;
})();