const mybatisMapper = require("mybatis-mapper");
const DBPool = require("../helper/DBPool");
const { RuntimeException } = require("../helper/ExceptionHelper");

class ProductService {
    constructor() {
        mybatisMapper.createMapper([
            "./server/mappers/ProductMapper.xml",
            "./server/mappers/ProductDetailMapper.xml",
            "./server/mappers/ProductImgMapper.xml",
            "./server/mappers/CategoryMapper.xml",
        ]);
    }

    async getList(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductMapper", "selectList", params);
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

    async getDetail(params) {
        let dbcon = null;
        let data = {};

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement("ProductDetailMapper", "selectList", params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.detail = result;

            sql = mybatisMapper.getStatement("ProductMapper", "selectItem", { id: params.product_id });
            [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.product = result[0];

            sql = mybatisMapper.getStatement("ProductDetailMapper", "selectColor", params);
            [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.color = result;

            sql = mybatisMapper.getStatement("ProductImgMapper", "selectList", params);
            [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.file = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }

    async getCg(params) {
        let dbcon = null;
        let data = {};

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement("CategoryMapper", "selectDepth1");
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.cg1 = result;

            sql = mybatisMapper.getStatement("CategoryMapper", "selectDepth2");
            [result] = await dbcon.query(sql);

            data.cg2 = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }

    async addCg1(params) {
        let dbcon = null;
        let data = {};

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("CategoryMapper", "insertDepth1", params);
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("CategoryMapper", "insertDepth2", {
                depth1_id: insertId,
                depth2: null,
            });
            [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("CategoryMapper", "selectDepth1");
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.cg1 = result;

            sql = mybatisMapper.getStatement("CategoryMapper", "selectDepth2");
            [result] = await dbcon.query(sql);
            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.cg2 = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }

    async addCg2(params) {
        let dbcon = null;
        let data = {};

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("CategoryMapper", "insertDepth2", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("CategoryMapper", "selectDepth1");
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.cg1 = result;

            sql = mybatisMapper.getStatement("CategoryMapper", "selectDepth2");
            [result] = await dbcon.query(sql);
            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data.cg2 = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }

    async addDetail(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductDetailMapper", "insertItem", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("ProductDetailMapper", "selectList", params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

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

    async addImg(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductImgMapper", "insertItem", params);
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("ProductImgMapper", "selectItem", {
                id: insertId,
            });
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
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

    async addProduct(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductMapper", "insertItem", params);
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("ProductMapper", "selectItem", { id: insertId });
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
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

    async editCg1(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("CategoryMapper", "updateDepth1", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("CategoryMapper", "selectDepth1");
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

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

    async editCg2(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("CategoryMapper", "updateDepth2", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("CategoryMapper", "selectDepth2");
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

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

    async editDetail(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductDetailMapper", "updateItem", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("ProductDetailMapper", "selectList");
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

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

    async editProduct(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductMapper", "updateItem", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("ProductMapper", "selectList");
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

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

    async deleteCg1(params) {
        let dbcon = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("CategoryMapper", "deleteDepth2", { depth1_id: params.id });
            let [{ affectedRows }] = await dbcon.query(sql);

            sql = mybatisMapper.getStatement("CategoryMapper", "deleteDepth1", params);
            [{ affectedRows }] = await dbcon.query(sql);
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }
    }

    async deleteCg2(params) {
        let dbcon = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("CategoryMapper", "deleteDepth2", params);
            let [{ affectedRows }] = await dbcon.query(sql);
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }
    }

    async deleteDetail(params) {
        let dbcon = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductDetailMapper", "deleteItem", params);
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

    async deleteImg(params) {
        let dbcon = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductImgMapper", "deleteItem", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }
    }

    async deleteProduct(params) {
        let dbcon = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement("ProductImgMapper", "deleteItem", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            sql = mybatisMapper.getStatement("ProductDetailMapper", "deleteItem", params);
            [{ affectedRows }] = await dbcon.query(sql);

            sql = mybatisMapper.getStatement("ProductMapper", "deleteItem", params);
            [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
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

            let sql = mybatisMapper.getStatement("ProductMapper", "selectCountAll", params);
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

module.exports = new ProductService();
