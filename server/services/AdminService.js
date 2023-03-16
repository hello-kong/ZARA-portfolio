const mybatisMapper = require("mybatis-mapper");
const DBPool = require("../helper/DBPool");
const { RuntimeException } = require("../helper/ExceptionHelper");

class NoticeService {
    constructor() {
        mybatisMapper.createMapper([
            "./server/mappers/AdminMapper.xml"
        ]);
    }

    async getList(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "AdminMapper",
                "selectList");
            let [result] = await dbcon.query(sql);

            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }

    async getItem(params) {
        let dbcon = null;
        let data = {};

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement(
                "AdminMapper",
                "selectItem",
                params
            );
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("등록된 관리자가 아닙니다.");
            }

            data = result[0];

        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }

    async addItem(params) {
        let dbcon = null;
        let data = {};

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "AdminMapper",
                "insertItem",
                params
            );
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("AdminMapper", "selectItem", {
                id: insertId,
            });
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException(
                    "저장된 데이터를 조회할 수 없습니다."
                );
            }

            data = result[0];

        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }


    async deleteItem(params) {
        let dbcon = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement("AdminMapper", "deleteItem", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("삭제된 데이터가 없습니다.");
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }
    }
}

module.exports = new NoticeService();
