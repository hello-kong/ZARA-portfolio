const mybatisMapper = require('mybatis-mapper');
const DBPool = require('../helper/DBPool');
const {RuntimeException} = require('../helper/ExceptionHelper');

class MemberService {
	constructor(){
		mybatisMapper.createMapper([
			'./server/mappers/MembersMapper.xml'
		]);
	}

	async getList(params) {
		let dbcon = null;
		let data = null;

		try {
			dbcon = await DBPool.getConnection();
			let sql = mybatisMapper.getStatement('MembersMapper', 'selectList', params);
			let [result] = await dbcon.query(sql);

			if (result.length === 0) {
				throw new RuntimeException('데이터를 조회할 수 없습니다.');
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

	async getItem(params) {
		let dbcon = null;
		let data = null;

		try {
			dbcon = await DBPool.getConnection();

			let sql = mybatisMapper.getStatement('MembersMapper', 'selectItem', params);
			let [result] = await dbcon.query(sql);

			if (result.length === 0) {
				throw new RuntimeException('데이터를 조회할 수 없습니다.');
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
		let data = null;

		try {
			dbcon = await DBPool.getConnection();
			let sql = mybatisMapper.getStatement('MembersMapper', 'insertItem', params);
			let [{insertId, affectedRows}] = await dbcon.query(sql);

			if (affectedRows === 0) {
				throw new RuntimeException('저장된 데이터가 없습니다.');
			}

			sql = mybatisMapper.getStatement('MembersMapper', 'selectItem', {id: insertId});
			let [result] = await dbcon.query(sql);

			if (result.length === 0) {
				throw new RuntimeException('저장된 데이터를 조회할 수 없습니다.');
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

	async getCount(params) {
        let dbcon = null;
        let cnt = 0;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('MembersMapper', 'selectCountAll', params);
            let [result] = await dbcon.query(sql);

            if (result.length > 0) {
                cnt = result[0].cnt;
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return cnt;
    }
}

module.exports = new MemberService();