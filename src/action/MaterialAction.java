package action;

import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import service.HibernateService;
import service.Service;
import utils.DateUtil;
import dao.Result;
import entity.Material;
import entity.Material_kind;
import entity.Operator;
import entity.Proffer;

public class MaterialAction extends BaseAction {

	private Service service;

	private Date createDate;

	private HibernateService hibernateService;

	private String others;

	private String code;

	private String fullName;

	private Material material;

	private String materialId;

	private String metricUnit;

	private String birthPlace;

	private String unitCost;

	private String kindId;

	private String profferId;

	public String getProfferId() {
		return profferId;
	}

	public void setProfferId(String profferId) {
		this.profferId = profferId;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
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

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Material getMaterial() {
		return material;
	}

	public void setMaterial(Material material) {
		this.material = material;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getMetricUnit() {
		return metricUnit;
	}

	public void setMetricUnit(String metricUnit) {
		this.metricUnit = metricUnit;
	}

	public String getBirthPlace() {
		return birthPlace;
	}

	public void setBirthPlace(String birthPlace) {
		this.birthPlace = birthPlace;
	}

	public String getUnitCost() {
		return unitCost;
	}

	public void setUnitCost(String unitCost) {
		this.unitCost = unitCost;
	}

	public String getKindId() {
		return kindId;
	}

	public void setKindId(String kindId) {
		this.kindId = kindId;
	}

	public void infos() {
		// 参数
		String limit = this.servletRequest.getParameter("limit");
		String page = this.servletRequest.getParameter("page");
		int st = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
		// 查询结果
		Result result = this.service.find(
				"from Material a order by a.createDate desc", new String[] {},
				st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from Material ");
		List<Material> list = (List<Material>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Material a : (List<Material>) list) {
			String operator = (String) this.service
					.find(
							"select u.name from Material a left join a.operator u where a.materialId=?",
							new String[] { a.getMaterialId() }).get(0);

			String kindname = (String) this.service
					.find(
							"select u.fullName from Material a left join a.material_kind u where a.materialId=?",
							new String[] { a.getMaterialId() }).get(0);

			String proffer = (String) this.service
					.find(
							"select u.fullName from Material a left join a.proffer u where a.materialId=?",
							new String[] { a.getMaterialId() }).get(0);

			jsono.put("materialId", a.getMaterialId());
			jsono.put("fullName", a.getFullName());
			jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
			jsono.put("others", a.getOthers());
			jsono.put("code", a.getCode());
			jsono.put("operator", operator);
			jsono.put("kindname", kindname);
			jsono.put("proffer", proffer);
			jsono.put("metricUnit", a.getMetricUnit());
			jsono.put("unitCost", a.getUnitCost());
			jsono.put("birthPlace", a.getBirthPlace());
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
			/**
			 * 保存操作员
			 */
			Operator o = (Operator) this.getSession().get("operator");
			material.setOperator(o);
			/**
			 * 保存类别
			 */
			Material_kind kind = (Material_kind) this.service.getObject(
					Material_kind.class, kindId);
			/**
			 * 保存材料供应商
			 */
			Proffer proffer = (Proffer) this.service.getObject(Proffer.class,
					profferId);
			material.setMaterial_kind(kind);
			material.setProffer(proffer);
			this.hibernateService.save(material);
			jsono.put("msg", "保存成功！");
			jsono.put("success", "true");
		} catch (Exception e) {
			e.printStackTrace();
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void delete() {
		String id = this.servletRequest.getParameter("id");
		this.service.removeObject(Material.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("msg", "删除成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void info() {
		String id = this.servletRequest.getParameter("id");
		Material a = (Material) this.service.getObject(Material.class, id);
		String profferId = (String) this.service
				.find(
						"select u.profferId from Material a left join a.proffer u where a.materialId=?",
						new String[] { a.getMaterialId() }).get(0);
		JSONObject jsono = new JSONObject();
		jsono.put("id", a.getMaterialId());
		jsono.put("unitCost", a.getUnitCost());
		jsono.put("profferId", profferId);
		jsono.put("birthPlace", a.getBirthPlace());
		JSONObject j = new JSONObject();
		j.put("items", jsono);
		j.put("success", true);
		JsonResult.json(j.toString(), servletResponse);
	}

	public void update() {
		String id = this.servletRequest.getParameter("id");

		Material p = (Material) this.service.getObject(Material.class, id);
		p.setUnitCost(unitCost);
		p.setBirthPlace(birthPlace);
		Proffer proffer = (Proffer) this.service.getObject(Proffer.class,
				profferId);
		p.setProffer(proffer);
		this.hibernateService.saveOrUpdate(p);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "更新成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void get() {
		List<Material> list = this.service.find(
				"from Material a order by a.createDate desc", new String[] {});
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Material a : (List<Material>) list) {
			jsono.put("mid", a.getMaterialId());
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

	public void get_proffer() {
		List<Material> list = this.service
				.find(
						"select a from Material a left join a.proffer p where p.id =? order by a.createDate desc",
						new String[] { profferId });
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Material a : (List<Material>) list) {
			jsono.put("id", a.getMaterialId());
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
