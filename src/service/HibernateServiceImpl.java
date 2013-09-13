package service;

import java.util.List;

import dao.HibernateDao;

public class HibernateServiceImpl implements HibernateService {

	private HibernateDao hibernateDao;

	public HibernateDao getHibernateDao() {
		return hibernateDao;
	}

	public void setHibernateDao(HibernateDao hibernateDao) {
		this.hibernateDao = hibernateDao;
	}

	public Object save(Object entity) {
		String id = (String) this.hibernateDao.save(entity);
		return id;
	}

	public void saveOrUpdate(Object entity) {
		this.hibernateDao.saveOrUpdate(entity);
	}

	public List find(String queryString, Object[] values) {
		return this.hibernateDao.find(queryString, values);
	}

}
