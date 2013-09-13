package service;

import java.util.List;

public interface HibernateService {
	Object save(Object entity);

	void saveOrUpdate(Object entity);

	List find(String queryString, Object[] values);

}
