package action;

import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import service.HibernateService;
import service.Service;
import utils.DateUtil;
import dao.Result;
import entity.Material_kind;
import entity.Operator;

public class MaterialKindAction extends BaseAction {

	private Service service;

	private String id;

	private Material_kind kind;

	private Date createDate;

	private HibernateService hibernateService;

	private String others;

	private String code;

	private String fullName;

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Material_kind getKind() {
		return kind;
	}

	public void setKind(Material_kind kind) {
		this.kind = kind;
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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * 材料类别查询
	 */
	public void infos() {
		// 参数
		String limit = this.servletRequest.getParameter("limit");
		String page = this.servletRequest.getParameter("page");
		int st = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
		// 查询结果
		Result result = this.service.find(
				"from Material_kind a order by a.createDate desc",
				new String[] {}, st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from Material_kind ");
		List<Material_kind> list = (List<Material_kind>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Material_kind a : (List<Material_kind>) list) {
			String operator = (String) this.service
					.find(
							"select u.name from Material_kind a left join a.operator u where a.id=?",
							new String[] { a.getId() }).get(0);
			jsono.put("id", a.getId());
			jsono.put("fullName", a.getFullName());
			jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
			jsono.put("others", a.getOthers());
			jsono.put("code", a.getCode());
			jsono.put("operator", operator);
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

	public void save() {
		JSONObject jsono = new JSONObject();
		try {

			Operator o = (Operator) this.getSession().get("operator");
			kind.setOperator(o);
			this.hibernateService.save(kind);
			jsono.put("msg", "保存成功！");
			jsono.put("success", "true");
		} catch (Exception e) {
			e.printStackTrace();
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void info() {
		String id = this.servletRequest.getParameter("id");
		Material_kind a = (Material_kind) this.service.getObject(
				Material_kind.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("id", a.getId());
		jsono.put("fullName", a.getFullName());
		jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
		jsono.put("others", a.getOthers());
		jsono.put("code", a.getCode());
		JSONObject j = new JSONObject();
		j.put("items", jsono);
		j.put("success", true);
		JsonResult.json(j.toString(), servletResponse);
	}

	public void delete() {
		String id = this.servletRequest.getParameter("id");
		/**
		 * 含有外间关联是伤处不了的
		 */
		this.service.removeObject(Material_kind.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("msg", "删除成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void update() {
		Material_kind p = (Material_kind) this.service.getObject(
				Material_kind.class, id);
		p.setCode(code);
		p.setOthers(others);
		p.setFullName(fullName);
		this.hibernateService.saveOrUpdate(p);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "更新成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void get() {
		List<Material_kind> list = this.service.find(
				"from Material_kind a order by a.createDate desc",
				new String[] {});
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Material_kind a : (List<Material_kind>) list) {
			jsono.put("id", a.getId());
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

}
