package dao;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class HibernateDaoImpl extends HibernateDaoSupport implements
		HibernateDao {

	public Object save(Object entity) {
		entity = this.getHibernateTemplate().save(entity);
		return entity;
	}

	public void saveOrUpdate(Object entity) {
		this.getHibernateTemplate().saveOrUpdate(entity);
	}

	public List find(String queryString, Object[] values) {
		return this.getHibernateTemplate().find(queryString, values);
	}

}
