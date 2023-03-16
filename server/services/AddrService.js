const mybatisMapper = require('mybatis-mapper');
const DBPool = require('../helper/DBPool');
const {RuntimeException} = require('../helper/ExceptionHelper');

class AddrService {
	constructor(){
		mybatisMapper.createMapper([
			'./server/mappers/AddrMapper.xml',
		]);
	}

	async getList(params) {
		let dbcon = null;
		let data = null;

		try {
			dbcon = await DBPool.getConnection();
			let sql = mybatisMapper.getStatement('AddrMapper', 'selectList', params);
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


	async addItem(params) {
		let dbcon = null;
		let data = {};

		try {
			dbcon = await DBPool.getConnection();
			let sql = mybatisMapper.getStatement('AddrMapper', 'insertItem', params);
			let [{insertId, affectedRows}] = await dbcon.query(sql);

			if (affectedRows === 0) {
				throw new RuntimeException('저장된 데이터가 없습니다.');
			}

			sql = mybatisMapper.getStatement('AddrMapper', 'selectItem', {id: insertId});
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

	async editItem(params) {
		let dbcon = null;
		let data = null;

		try {
			dbcon = await DBPool.getConnection();
			let sql = mybatisMapper.getStatement('AddrMapper', 'updateItem', params);
			let [{affectedRows}] = await dbcon.query(sql);

			if (affectedRows === 0) {
				throw new RuntimeException('저장된 데이터가 없습니다.');
			}

			

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

			let sql = mybatisMapper.getStatement('AddrMapper', 'deleteItem', params);
			let [{affectedRows}] = await dbcon.query(sql);

			if (affectedRows === 0) {
				throw new RuntimeException('삭제된 데이터가 없습니다.');
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

module.exports = new AddrService();