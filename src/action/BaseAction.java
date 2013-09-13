package action;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;

import utils.DateUtil;
import utils.Util;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import entity.AdminUser;
import entity.Operator;

public class BaseAction extends ActionSupport implements ServletResponseAware,
		ServletRequestAware, SessionAware {

	protected HttpServletRequest servletRequest;

	protected HttpServletResponse servletResponse;

	protected ServletContext application;

	public String successValue;

	ActionContext actionContext = ActionContext.getContext();
	Map<String, Object> session;

	/**
	 * 获取跟路径
	 * 
	 * @return
	 */
	public String getGenPath() {
		return ServletActionContext.getServletContext().getRealPath("/");
	}

	protected AdminUser getCurrentUser() {
		return (AdminUser) this.getSession().get("adminuser");
	}

	protected Operator getCurrentOperator() {
		return (Operator) this.getSession().get("operator");
	}

	/**
	 * 装配参数hql语句
	 * 
	 * @param entity
	 * @return
	 * @throws ParseException
	 */
	public String completeHQL(String entity) throws ParseException {
		String hql = " where ";
		Enumeration params = (Enumeration) this.servletRequest
				.getParameterNames();
		while (params.hasMoreElements()) {
			String param = (String) params.nextElement();
			if (param.contains("_")) {
				String[] array = param.split("_");
				String paramname = "";
				String action = "";
				String type = "";
				if (array.length == 3) {
					paramname = array[0];
					action = array[1];
					type = array[2];
				}
				if (array.length == 4) {
					paramname = array[0] + "." + array[1];
					action = array[2];
					type = array[3];
				}
				if (Util.isValidSring(paramname) && Util.isValidSring(action)
						&& Util.isValidSring(type)) {
					String paramvalue = this.servletRequest.getParameter(param);
					if (Util.isValidSring(paramvalue) == true) {
						String g = this.completeFormula(action);
						hql += " " + entity + "." + paramname + g;
						if (g.equals(" like ")) {
							paramvalue = "%" + paramvalue + "%";
						}
						if (type.equals("DATE")) {
							hql += "'"
									+ DateUtil.formatDate(DateFormat
											.getDateInstance()
											.parse(paramvalue)) + "'" + " and ";
						} else {
							hql += "'" + paramvalue + "'" + " and ";
						}
					}
				}
			}
		}
		hql += "1=1";
		return hql;
	}

	/**
	 * 匹配公式符号
	 * 
	 * @param f
	 * @return
	 */
	public String completeFormula(String f) {
		if (f.equals("LIKE")) {
			return " like ";
		}
		if (f.equals("GT")) {
			return " > ";
		}
		if (f.equals("LT")) {
			return " < ";
		}
		if (f.equals("EQ")) {
			return " = ";
		} else {
			return "";
		}
	}

	/**
	 * 处理json中的timestamp格式日期
	 * 
	 * @return
	 */
	protected JsonConfig getCfg() {
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.util.Date.class,
				new JsonValueProcessor() {
					private final String format = "yyyy-MM-dd HH:mm:ss";

					public Object processObjectValue(String key, Object value,
							JsonConfig arg2) {
						if (value == null)
							return "";
						if (value instanceof Date) {
							String str = new SimpleDateFormat(format)
									.format((Date) value);
							return str;
						}
						return value.toString();
					}

					public Object processArrayValue(Object value,
							JsonConfig arg1) {
						return null;
					}
				});
		return cfg;
	}

	/**
	 * 统计在线人数
	 * 
	 * @return
	 */
	protected int getSessionCount() {
		HashSet hs = (HashSet) this.getApplication().getAttribute("sessions");
		return hs.size();
	}

	/**
	 * 删除文件
	 * 
	 * @param file
	 * @return
	 * @throws Exception
	 */
	protected Boolean deleteFile(String file) throws Exception {
		File f = new File(file);
		Boolean flag = false;
		if (f.exists()) {
			try {
				f.delete();
				flag = true;
			} catch (Exception e) {
				throw new Exception(e);
			}
		}
		return flag;
	}

	protected ActionContext getActionContext() {
		return actionContext;
	}

	protected void setActionContext(ActionContext actionContext) {
		this.actionContext = actionContext;
	}

	protected ServletContext getApplication() {
		return application;
	}

	protected void setApplication(ServletContext application) {
		this.application = application;
	}

	protected Map<String, Object> getSession() {
		return session;
	}

	public void setSession(Map<String, Object> session) {
		this.session = session;
	}

	protected String getSuccessValue() {
		return successValue;
	}

	protected void setSuccessValue(String successValue) {
		this.successValue = successValue;
	}

	protected HttpServletRequest getServletRequest() {
		return servletRequest;
	}

	public void setServletRequest(HttpServletRequest servletRequest) {
		this.servletRequest = servletRequest;
	}

	protected HttpServletResponse getServletResponse() {
		return servletResponse;
	}

	public void setServletResponse(HttpServletResponse servletResponse) {
		this.servletResponse = servletResponse;
	}

}
