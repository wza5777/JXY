package action;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import service.HibernateService;
import service.Service;
import utils.DateUtil;
import dao.Result;
import entity.AdminUser;
import entity.Operator;

public class OperatorAction extends BaseAction {

	private Operator operator;

	private Service service;

	private String id;

	private String phone;

	private int sex;

	private Date createDate;

	private HibernateService hibernateService;

	private String others;

	private String home;

	private String name;

	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Operator getOperator() {
		return operator;
	}

	public void setOperator(Operator operator) {
		this.operator = operator;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public HibernateService getHibernateService() {
		return hibernateService;
	}

	public void setHibernateService(HibernateService hibernateService) {
		this.hibernateService = hibernateService;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public String getHome() {
		return home;
	}

	public void setHome(String home) {
		this.home = home;
	}

	/**
	 * 获取操作员信息
	 * 
	 * @throws ParseException
	 * @throws NumberFormatException
	 */
	public void infos() throws NumberFormatException, ParseException {
		// 参数
		String limit = this.servletRequest.getParameter("limit");
		String page = this.servletRequest.getParameter("page");
		int st = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
		// 查询结果
		Result result = this.service.find("from Operator o "
				+ this.completeHQL("o") + " order by o.createDate desc",
				new String[] {}, st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from Operator o"
				+ this.completeHQL("o") + "");
		List<Operator> list = (List<Operator>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Operator a : (List<Operator>) list) {
			jsono.put("id", a.getId());
			jsono.put("name", a.getName());
			jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
			jsono.put("sex", a.getSex());
			jsono.put("phone", a.getPhone());
			jsono.put("home", a.getHome());
			jsono.put("others", a.getOthers());
			jsonArray.add(jsono);
			jsono.clear();
		}
		JSONObject j = new JSONObject();
		// 设置回传参数
		j.put("totalCount", total);
		j.put("items", jsonArray);
		j.put("start", st);
		j.put("limit", limit);
		// 回传
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 保存操作员信息
	 * 
	 * @throws Exception
	 */
	public void save() {
		JSONObject jsono = new JSONObject();
		try {

			AdminUser adminuser = (AdminUser) this.getSession()
					.get("adminuser");
			operator.setAdminuser(adminuser);
			operator.setLimitFile(this.createFile(operator));
			this.hibernateService.save(operator);
			jsono.put("msg", "保存成功！");
			jsono.put("success", "true");
		} catch (Exception e) {
			e.printStackTrace();
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 获取操作员权限文件夹
	 * 
	 * @return
	 */
	private String getLimitPath() {
		return ServletActionContext.getServletContext().getRealPath("/");
	}

	/**
	 * 创建权限文件
	 * 
	 * @param operator
	 * @return
	 * @throws IOException
	 */
	private String createFile(Operator operator) throws IOException {
		Date date = new Date();
		String path = "/JXY/js/operator_limit/";
		String filename = operator.getName();
		String p = path + filename + ".js";

		String filepath = this.getLimitPath() + p;
		File file = new File(filepath);
		if (!file.exists()) {
			file.createNewFile();
		}
		return p;
	}

	/**
	 * 查找一个操作员的信息
	 */
	public void info() {
		String id = this.servletRequest.getParameter("id");
		Operator a = (Operator) this.service.getObject(Operator.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("id", a.getId());
		jsono.put("name", a.getName());
		jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
		jsono.put("sex", a.getSex());
		jsono.put("phone", a.getPhone());
		jsono.put("home", a.getHome());
		jsono.put("others", a.getOthers());
		JSONObject j = new JSONObject();
		j.put("items", jsono);
		j.put("success", true);
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 查找一个操作员的信息
	 */
	public void info_self() {
		Operator a = (Operator) this.getSession().get("operator");
		JSONObject jsono = new JSONObject();
		jsono.put("phone", a.getPhone());
		jsono.put("home", a.getHome());
		JSONObject j = new JSONObject();
		j.put("items", jsono);
		j.put("success", true);
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 更新操作员信息
	 */
	public void update_self() {
		Operator p = (Operator) this.getSession().get("operator");
		p.setHome(home);
		p.setPhone(phone);
		p.setPassword(password);
		this.hibernateService.saveOrUpdate(p);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "更新成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 删除一个操作员
	 */
	public void delete() {
		String id = this.servletRequest.getParameter("id");
		Operator o = (Operator) this.service.getObject(Operator.class, id);
		try {
			/**
			 * 删除权限文件
			 */
			this.deleteFile(o.getLimitFile());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.service.removeObject(o);
		JSONObject jsono = new JSONObject();
		jsono.put("msg", "删除成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 更新操作员信息
	 */
	public void update() {
		Operator p = (Operator) this.service.getObject(Operator.class, id);
		p.setHome(home);
		p.setOthers(others);
		p.setPhone(phone);
		p.setSex(sex);
		p.setName(name);
		p.setPassword(password);
		this.hibernateService.saveOrUpdate(p);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "更新成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
