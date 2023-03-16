const mybatisMapper = require("mybatis-mapper");
const DBPool = require("../helper/DBPool");
const { RuntimeException } = require("../helper/ExceptionHelper");

class NoticeService {
    constructor() {
        mybatisMapper.createMapper([
            "./server/mappers/NoticeMapper.xml"
        ]);
    }

    async getList(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "NoticeMapper",
                "selectList",
                params
            );
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
                "NoticeMapper",
                "selectItem",
                params
            );
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.notice = result[0];

            sql = mybatisMapper.getStatement("NoticeMapper", "selectNum", params);
            [result] = await dbcon.query(sql);

            data.num = result;
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
                "NoticeMapper",
                "insertItem",
                params
            );
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("NoticeMapper", "selectItem", {
                id: insertId,
            });
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException(
                    "저장된 데이터를 조회할 수 없습니다."
                );
            }

            data.notice = result[0];

            sql = mybatisMapper.getStatement("NoticeMapper", "selectNum", {id: insertId});
            [result] = await dbcon.query(sql);

            data.num = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }

    async editItem(params) {
        let dbcon = null;
        let data = {};

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "NoticeMapper",
                "updateItem",
                params
            );
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("NoticeMapper", "selectItem", {
                id: params.id,
            });
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException(
                    "저장된 데이터를 조회할 수 없습니다."
                );
            }

            data.notice = result[0];

            sql = mybatisMapper.getStatement("NoticeMapper", "selectNum", {id: params.id});
            [result] = await dbcon.query(sql);

            data.num = result;
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

            let sql = mybatisMapper.getStatement("NoticeMapper", "deleteItem", params);
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

    async getCount(params) {
        let dbcon = null;
        let cnt = 0;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement(
                "NoticeMapper",
                "selectCountAll",
                params
            );
            let [result] = await dbcon.query(sql);

            if (result.length > 0) {
                cnt = result[0].cnt;
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return cnt;
    }
}

module.exports = new NoticeService();
