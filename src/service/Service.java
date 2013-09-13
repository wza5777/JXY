package service;

import java.io.Serializable;
import java.util.List;

import dao.Result;

public interface Service {

	public List getObjects(Class clazz);

	public Object getObject(Class clazz, Serializable id);

	public void saveObject(Object o);

	public void removeObject(Class clazz, Serializable id);

	public void removeObject(Object o);

	List find(String queryString, Object[] values);

	int count(String queryString);

	Result find(String queryString, Object[] values, int start, int limit);

}
