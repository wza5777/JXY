package service;

import java.io.Serializable;
import java.util.List;

import dao.DAO;
import dao.Result;

public class ServiceImpl implements Service {

	private DAO dao;

	public DAO getDao() {
		return dao;
	}

	public void setDao(DAO dao) {
		this.dao = dao;
	}

	public Object getObject(Class clazz, Serializable id) {
		return this.dao.getObject(clazz, id);
	}

	public List getObjects(Class clazz) {
		return this.dao.getObjects(clazz);
	}

	public void removeObject(Class clazz, Serializable id) {
		this.dao.removeObject(clazz, id);

	}

	public void removeObject(Object o) {
		this.dao.removeObject(o);

	}

	public void saveObject(Object o) {
		this.saveObject(o);

	}

	public List find(String queryString, Object[] values) {
		return this.dao.find(queryString, values);
	}

	public int count(String queryString) {
		return this.dao.count(queryString);
	}

	public Result find(String queryString, Object[] values, int start, int limit) {
		return this.dao.find(queryString, values, start, limit);
	}

}
