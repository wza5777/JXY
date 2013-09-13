package dao;

import java.util.List;

public interface HibernateDao {
	Object save(Object entity);

	void saveOrUpdate(Object entity);

	List find(String queryString, Object[] values);

}
