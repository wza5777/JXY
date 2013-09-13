package utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * <p>
 * 方便的使用一些比较常用的日期转换型式
 * </p>
 * 
 * @author huang
 * 
 */
public class DateUtil {

	private static final SimpleDateFormat formatter = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public static synchronized String formatDate(Date date) {
		return formatter.format(date);
	}

	/**
	 * 用于返回自定义且有效的日期时间格式,并且验证传入的参数是否符合基本的字符串规范
	 * 
	 * @see SimpleDateFormat
	 * @see net.totosea.other.Util
	 * @param formatstring
	 * @return format
	 */
	public static SimpleDateFormat format(String formatstring) {
		SimpleDateFormat format = new SimpleDateFormat();
		if (Util.isValidSring(formatstring)) {
			format.applyPattern(formatstring);
		} else {
			format = formatter;
		}
		return format;
	}

	/**
	 * 时区
	 * 
	 * @return
	 */
	public static String[] timeZone() {
		String timeZoneKey = "HST,AST,PST,PNT,MST,CST,IET,"
				+ "EST,PRT,AGT,BET,CNT,CAT,GMT,"
				+ "ECT,EET,ART,EAT,NET,MET,PLT,"
				+ "IST,BST,VST,CTT,JST,ACT,AET," + "SST,NST";
		String[] timeZoneKeyArray = timeZoneKey.split(",");
		return timeZoneKeyArray;
	}

	/**
	 * 判断日期是否在这个月的月初
	 * 
	 * @return
	 */
	public static Boolean isFirst() {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("CTT"));
		int nowDay = calendar.get(Calendar.DAY_OF_MONTH);
		if (nowDay == 1) {
			return Boolean.TRUE;
		} else {
			return Boolean.FALSE;
		}
	}

	/**
	 * 判断日期是否在这个月的月末
	 * 
	 * @return
	 */
	public static Boolean isLast() {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("CTT"));
		int nowDay = calendar.get(Calendar.DAY_OF_MONTH);
		calendar.set(Calendar.DATE, nowDay + 1);
		if (calendar.get(Calendar.DAY_OF_MONTH) == 1) {
			return Boolean.TRUE;
		} else {
			return Boolean.FALSE;
		}
	}

	/**
	 * 得到哦某年某月的最后一天
	 * 
	 * @param year
	 * @param month
	 * @return
	 */
	public static int getLastDayOfMonth(int year, int month) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month);
		return cal.getActualMaximum(Calendar.DATE);
	}

	/**
	 * 得到某年某月的第一天
	 * 
	 * @param year
	 * @param month
	 * @return
	 */
	public static int getFirstDayOfMonth(int year, int month) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month);
		return cal.getActualMinimum(Calendar.DATE);
	}
}
