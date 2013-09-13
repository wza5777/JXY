package dao;

import static java.lang.String.format;
import static java.util.Collections.unmodifiableMap;
import static org.apache.commons.lang.StringUtils.isNotBlank;
import static org.springframework.util.Assert.isTrue;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class HQL {

	public enum AndOr {
		AND("and"), OR("or");

		private final String meta;

		private AndOr(final String meta) {
			this.meta = meta;
		}

		public String asMeta() {
			return meta;
		}
	}

	public enum MatchType {
		EQ("="), NE("<>"), LIKE("like"), GT(">"), LT("<"), GE(">="), LE("<="), IN(
				"in"), NI("not in");

		private final String meta;

		private MatchType(final String meta) {
			this.meta = meta;
		}

		public String asMeta() {
			return meta;
		}
	}

	private final StringBuilder query = new StringBuilder();
	private final Map<String, Object> values = new HashMap<String, Object>();

	private int tableNameLength = 0;
	private boolean alreadyInsertWhere = false;

	public String hql() {
		if (!values.isEmpty() && !alreadyInsertWhere) {
			query.insert(tableNameLength, "where ");
			alreadyInsertWhere = true;
		}
		return query.toString();
	}

	public Map<String, Object> values() {
		return unmodifiableMap(values);
	}

	/**
	 * 
	 * @param table
	 * @return
	 */
	public HQL table(String table) {
		String fromTable = table;

		if (fromTable.toLowerCase().indexOf("from") == -1) {
			fromTable = format("from %s ", fromTable);
		}

		if (!fromTable.endsWith(" ")) {
			fromTable = format("%s ", fromTable);
		}

		query.insert(0, fromTable);
		tableNameLength = fromTable.length();
		return this;
	}

	/**
	 * xxx is null or xxx not null
	 * 
	 * @param hql
	 * @return
	 */
	public HQL append(final String hql) {
		query.append(hql);
		return this;
	}

	/**
	 * 
	 * @param property
	 * @param propertyKey
	 * @param type
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL criteria(String property, String propertyKey, MatchType type,
			Object propertyValue, AndOr andOr) {
		if (null != propertyValue && isNotBlank(propertyValue.toString())) {

			propertyKey = transformKey(type, propertyKey);

			if (!values.isEmpty()) {
				query.append(format("%s ", andOr.asMeta()));
			}

			if (type == MatchType.IN || type == MatchType.NI) {
				query.append(format("%s %s (:%s) ", property, type.asMeta(),
						propertyKey));
			} else {
				query.append(format("%s %s :%s ", property, type.asMeta(),
						propertyKey));
			}

			values.put(propertyKey, transformValue(type, propertyValue));
		}
		return this;
	}

	/**
	 * 
	 * @param matchType
	 * @param key
	 * @return
	 */
	private String transformKey(MatchType matchType, String key) {
		key = key.replaceAll("\\.", "_");
		if (values.containsKey(key)) {
			key = format("%s_%s", key, randomstring(4));
		}

		return key;
	}

	/**
	 * 
	 * @param matchType
	 * @param value
	 * @return
	 */
	private Object transformValue(MatchType matchType, Object value) {

		switch (matchType) {
		case LIKE:
			if (value.toString().indexOf("%") == -1) {
				return format("%%%s%%", value.toString());
			}
		default:
			return value;
		}
	}

	private static String RANDOM_SOURCE = "0123456789ABCDEF";

	/**
	 * 
	 * @param length
	 * @return
	 */
	private String randomstring(int length) {
		Random random = new Random();

		StringBuilder buf = new StringBuilder();

		for (int i = 0; i < length; i++) {
			int index = random.nextInt(RANDOM_SOURCE.length());
			buf.append(RANDOM_SOURCE.charAt(index));
		}

		return buf.toString();
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL eq(String property, Object propertyValue) {
		return criteria(property, property, MatchType.EQ, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL ne(String property, Object propertyValue) {
		return criteria(property, property, MatchType.NE, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL gt(String property, Object propertyValue) {
		return criteria(property, property, MatchType.GT, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL lt(String property, Object propertyValue) {
		return criteria(property, property, MatchType.LT, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL ge(String property, Object propertyValue) {
		return criteria(property, property, MatchType.GE, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL le(String property, Object propertyValue) {
		return criteria(property, property, MatchType.LE, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL like(String property, String propertyValue) {
		return criteria(property, property, MatchType.LIKE, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL in(String property, Object propertyValue) {
		return criteria(property, property, MatchType.IN, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param propertyValue
	 * @param andOr
	 * @return
	 */
	public HQL ni(String property, Object propertyValue) {
		return criteria(property, property, MatchType.NI, propertyValue,
				AndOr.AND);
	}

	/**
	 * 
	 * @param property
	 * @param type
	 * @param value
	 * @return
	 */
	public HQL or(String property, MatchType type, Object value) {
		return or(new String[] { property }, new MatchType[] { type },
				new Object[] { value });
	}

	/**
	 * 
	 * @param properties
	 * @param matchTypes
	 * @param values
	 * @return
	 */
	public HQL or(String[] properties, MatchType[] matchTypes, Object[] values) {
		isTrue(properties.length == matchTypes.length ? matchTypes.length == values.length
				: false);

		if (properties.length == 0) {
			return this;
		}

		if (properties.length == 1) {
			Object value = transformValue(matchTypes[0], values[0]);
			return criteria(properties[0], properties[0], matchTypes[0], value,
					AndOr.OR);
		}

		if (!this.values.isEmpty()) {
			query.append(format("%s ", AndOr.AND.asMeta()));
		}

		StringBuilder buf = new StringBuilder();
		for (int i = 0; i < properties.length; i++) {

			String key = transformKey(matchTypes[i], properties[i]);
			Object value = transformValue(matchTypes[i], values[i]);

			if (matchTypes[i] == MatchType.IN || matchTypes[i] == MatchType.NI) {
				buf.append(format("(%s %s (:%s)) ", properties[i],
						matchTypes[i].asMeta(), key));
			} else {
				buf.append(format("(%s %s :%s) ", properties[i], matchTypes[i]
						.asMeta(), key));
			}

			this.values.put(key, value);

			if (i < properties.length - 1) {
				buf.append(format("%s ", AndOr.OR.asMeta()));
			}
		}

		query.append(format("(%s) ", buf.substring(0, buf.length() - 1)));
		return this;
	}

	/**
	 * 
	 * @param orderBy
	 * @return
	 */
	public HQL orderBy(final String orderBy) {
		String orderByString = orderBy;

		if (orderByString.toLowerCase().indexOf("order by") == -1) {
			orderByString = format("order by %s ", orderByString);
		}

		query.append(orderByString);
		return this;
	}

	/**
	 * 
	 * @param groupBy
	 * @return
	 */
	public HQL groupBy(final String groupBy) {
		String groupByString = groupBy;

		if (groupByString.toLowerCase().indexOf("group by") == -1) {
			groupByString = format("group by %s ", groupByString);
		}

		query.append(groupByString);
		return this;
	}

}
