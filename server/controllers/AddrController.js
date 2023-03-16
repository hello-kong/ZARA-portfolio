const express = require('express');
const logger = require('../helper/LogHelper');
const regexHelper = require('../helper/RegexHelper');

const MembersService = require('../services/MembersService');
const AddrService = require('../services/AddrService');
const dayjs = require('dayjs');

module.exports = (() => {
    const url = "/address";
    const router = express.Router();
    
/** 
 * 추가주소록 (address테이블 데이터) 
 * */
    
    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
 
        // let params = {};
        // 데이터 조회
        let json = null;
        

        try {
            json = await AddrService.getList();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    
    /** 데이터 추가 --> Create(INSERT) */
    router.post(url, async (req, res, next) => {
        // 파라미터 받기
        const { addname, postcode, roadaddr, detailaddr, tel } = req.body;

        // 유효성 검사
        try {
            regexHelper.value(addname, '이름을 입력하십시오.');
            regexHelper.maxLength(addname, 20, '이름은 최대 20자까지 입력 가능합니다.');
            regexHelper.kor(addname, '이름은 한글로만 입력 가능합니다.');
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
            json = await AddrService.addItem({
                addname: addname,
                postcode: postcode,
                roadaddr: roadaddr,
                detailaddr: detailaddr,
                tel: tel,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:id`, async (req, res, next) => {
        // 파라미터 받기
        const { id } = req.params;
        const { addname, postcode, roadaddr, detailaddr, tel, company, crn } = req.body;

        // 유효성 검사
        try {
            regexHelper.value(id, '수정할 주소가 없습니다.');
            regexHelper.num(id, '수정할 주소의 번호가  잘못되었습니다.');
            regexHelper.value(addname, '이름을 입력하십시오.');
            regexHelper.maxLength(addname, 20, '이름은 최대 20자까지 입력 가능합니다.');
            regexHelper.kor(addname, '이름은 한글로만 입력 가능합니다.');
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
            json = await AddrService.editItem({
                id: id,
                addname: addname,
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

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:id`, async (req, res, next) => {
        // 파라미터 받기
        const { id } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(id, '삭제할 주소가 없습니다.');
            regexHelper.num(id, '삭제할 주소의 번호가 잘못되었습니다.');
        } catch (err) {
            return next(err);
        }

        try {
            await AddrService.deleteItem({
                id: id
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();