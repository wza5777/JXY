package action;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;
import service.HibernateService;
import service.Service;
import utils.DateUtil;
import dao.Result;
import entity.AdminUser;

public class AdminAction extends BaseAction {

	private AdminUser user;

	private String username;

	private String nickname;

	private String password;

	private Long sex;

	private Date createDate;

	private Date registDate;

	private Service service;

	private String id;

	private String address;

	private String phone;

	private HibernateService hibernateService;

	private int identity;

	public int getIdentity() {
		return identity;
	}

	public void setIdentity(int identity) {
		this.identity = identity;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public HibernateService getHibernateService() {
		return hibernateService;
	}

	public void setHibernateService(HibernateService hibernateService) {
		this.hibernateService = hibernateService;
	}

	/**
	 * 登陆
	 */
	public void login() {
		JSONObject jsono = new JSONObject();
		Object[] values = { user.getUsername(), user.getPassword() };
		if (identity == 1) {
			List list = this.service.find(
					"from AdminUser u where u.username=? and u.password=?",
					values);
			if (list.size() > 0) {
				this.session.put("adminuser", list.get(0));
				jsono.put("success", "true");
				jsono.put("index", "JXY/jsp/index.jsp");
				jsono.put("flag", "true");
			} else {
				jsono.put("success", "true");
				jsono.put("flag", "false");
				jsono.put("msg", "用户名或密码不正确");
			}
		}
		if (identity == 2) {
			List list = this.service.find(
					"from Operator u where u.name=? and u.password=?", values);
			if (list.size() > 0) {
				this.session.put("operator", list.get(0));
				jsono.put("success", "true");
				jsono.put("index", "JXY/jsp/index_operator.jsp");
				jsono.put("flag", "true");
			} else {
				jsono.put("success", "true");
				jsono.put("flag", "false");
				jsono.put("msg", "用户名或密码不正确");
			}
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public AdminUser getUser() {
		return user;
	}

	public void setUser(AdminUser user) {
		this.user = user;
	}

	/**
	 * 获取管理员信息
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
		Result result = this.service.find("from AdminUser u "
				+ this.completeHQL("u") + " order by u.createDate desc",
				new String[] {}, st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from AdminUser u "
				+ this.completeHQL("u") + "");
		// 得到管理员信息
		List<AdminUser> list = (List<AdminUser>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (AdminUser a : (List<AdminUser>) list) {
			jsono.put("id", a.getId());
			jsono.put("username", a.getUsername());
			jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
			jsono.put("registDate", DateUtil.formatDate(a.getRegistDate()));
			jsono.put("sex", a.getSex());
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
	 * 保存管理员信息
	 * 
	 * @throws Exception
	 */
	public void save() {
		JSONObject jsono = new JSONObject();
		try {
			user.setLevel(1);
			this.hibernateService.save(user);
			jsono.put("msg", "保存成功！");
			jsono.put("success", "true");
		} catch (Exception e) {
			e.printStackTrace();
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 删除一个用户
	 */
	public void delete() {
		String id = this.servletRequest.getParameter("id");
		this.service.removeObject(AdminUser.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("msg", "删除成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 退出系统
	 */
	public void logout() {
		JSONObject jsono = new JSONObject();
		try {
			String op = this.servletRequest.getParameter("op");
			if (op.equals("2")) {
				/**
				 * 注销管理员
				 */
				if (this.session.get("adminuser") != null) {
					this.session.remove("adminuser");
				}
			}
			if (op.equals("1")) {
				/**
				 * 注销操作员
				 */
				if (this.session.get("operator") != null) {
					this.session.remove("operator");
				}
			}
			jsono.put("flag", "true");
		} catch (Exception e) {
			jsono.put("flag", "false");
			e.printStackTrace();
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 查看管理员信息
	 */
	public void info() {
		String id = this.servletRequest.getParameter("id");
		AdminUser a = (AdminUser) this.service.getObject(AdminUser.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("sex", a.getSex());
		jsono.put("username", a.getUsername());
		jsono.put("nickname", a.getNickname());
		JSONObject j = new JSONObject();
		j.put("items", jsono);
		j.put("success", true);
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 管理员信息更新
	 */
	public void update() {
		AdminUser a = (AdminUser) this.service.getObject(AdminUser.class, id);
		a.setPassword(password);
		a.setNickname(nickname);
		a.setUsername(username);
		a.setSex(sex);
		this.hibernateService.saveOrUpdate(a);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "更新成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 查找一个操作员的信息
	 */
	public void info_self() {
		AdminUser a = (AdminUser) this.getSession().get("adminuser");
		JSONObject jsono = new JSONObject();
		jsono.put("address", a.getAddress());
		jsono.put("username", a.getUsername());
		JSONObject j = new JSONObject();
		j.put("items", jsono);
		j.put("success", true);
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 更新操作员信息
	 */
	public void update_self() {
		AdminUser p = (AdminUser) this.getSession().get("adminuser");
		p.setAddress(address);
		p.setUsername(username);
		p.setPassword(password);
		this.hibernateService.saveOrUpdate(p);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "更新成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getSex() {
		return sex;
	}

	public void setSex(Long sex) {
		this.sex = sex;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getRegistDate() {
		return registDate;
	}

	public void setRegistDate(Date registDate) {
		this.registDate = registDate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * 返回管理员的详细信息
	 */
	public void info_detail() {
		AdminUser a = (AdminUser) this.service.getObject(AdminUser.class, id);
		JsonConfig cfg = this.getCfg();
		cfg.setJsonPropertyFilter(new PropertyFilter() {
			public boolean apply(Object source, String name, Object value) {
				if (name.equals("operators") || name.equals("bills")
						|| name.equals("bs")) {
					return true;
				} else {
					return false;
				}
			}

		});
		JSONObject jsono = JSONObject.fromObject(a, cfg);
		JSONObject j = new JSONObject();
		j.put("items", jsono);
		j.put("success", true);
		System.out.println(j);
		JsonResult.json(j.toString(), servletResponse);
	}

}
