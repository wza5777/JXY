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
import entity.Proffer;

public class ProfferAction extends BaseAction {

	private Proffer proffer;

	private Service service;

	private String fullName;

	private String phone;

	private String address;

	private int sex;

	private Date createDate;

	private String contactPerson;

	private String profferId;

	private String others;

	private int position;

	private String mail;

	private String postcode;

	private String qq;

	private String msn;

	private String webset;

	private String fax;

	private HibernateService hibernateService;

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

	public Proffer getProffer() {
		return proffer;
	}

	public void setProffer(Proffer proffer) {
		this.proffer = proffer;
	}

	/**
	 * 获取材料供货商信息
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
		Result result = this.service.find("from Proffer p "
				+ this.completeHQL("p") + " order by p.createDate desc",
				new String[] {}, st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from Proffer p "
				+ this.completeFormula("p") + "");
		List<Proffer> list = (List<Proffer>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Proffer a : (List<Proffer>) list) {
			jsono.put("id", a.getProfferId());
			jsono.put("fullName", a.getFullName());
			jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
			jsono.put("sex", a.getSex());
			jsono.put("phone", a.getPhone());
			jsono.put("address", a.getAddress());
			jsono.put("contactPerson", a.getContactPerson());
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
	 * 保存材料供货商信息
	 * 
	 * @throws Exception
	 */
	public void save() {
		JSONObject jsono = new JSONObject();
		try {
			this.hibernateService.save(proffer);
			jsono.put("msg", "保存成功！");
			jsono.put("success", "true");
		} catch (Exception e) {
			e.printStackTrace();
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 查找一个材料供应商的信息
	 */
	public void info() {
		String id = this.servletRequest.getParameter("profferId");
		Proffer a = (Proffer) this.service.getObject(Proffer.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("fullName", a.getFullName());
		jsono.put("phone", a.getPhone());
		jsono.put("address", a.getAddress());
		jsono.put("profferId", a.getProfferId());
		jsono.put("others", a.getOthers());
		jsono.put("contactPerson", a.getContactPerson());
		jsono.put("sex", a.getSex());
		JSONObject j = new JSONObject();
		j.put("items", jsono);
		j.put("success", true);
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 删除一个材料供应商
	 */
	public void delete() {
		String id = this.servletRequest.getParameter("profferId");
		this.service.removeObject(Proffer.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("msg", "删除成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 更新材料商信息
	 */
	public void update() {
		Proffer p = (Proffer) this.service.getObject(Proffer.class, profferId);
		p.setAddress(address);
		p.setContactPerson(contactPerson);
		p.setPhone(phone);
		p.setSex(sex);
		p.setFax(fax);
		p.setFullName(fullName);
		p.setMail(mail);
		p.setPosition(position);
		p.setPostcode(postcode);
		p.setWebset(webset);
		this.hibernateService.saveOrUpdate(p);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "更新成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 获取供应商信息
	 */
	public void get() {
		List<Proffer> list = this.service.find(
				"from Proffer a order by a.createDate desc", new String[] {});
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Proffer a : (List<Proffer>) list) {
			jsono.put("id", a.getProfferId());
			jsono.put("name", a.getFullName());
			jsonArray.add(jsono);
			jsono.clear();
		}
		JSONObject j = new JSONObject();
		// 设置回传参数
		j.put("items", jsonArray);
		// 回传
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 查看材料供应商详细信息
	 */
	public void info_detail() {
		Proffer a = (Proffer) this.service.getObject(Proffer.class, profferId);
		JsonConfig cfg = this.getCfg();
		cfg.setJsonPropertyFilter(new PropertyFilter() {
			public boolean apply(Object source, String name, Object value) {
				if (name.equals("materials") || name.equals("bills")) {
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

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getProfferId() {
		return profferId;
	}

	public void setProfferId(String profferId) {
		this.profferId = profferId;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getMsn() {
		return msn;
	}

	public void setMsn(String msn) {
		this.msn = msn;
	}

	public String getWebset() {
		return webset;
	}

	public void setWebset(String webset) {
		this.webset = webset;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

}
