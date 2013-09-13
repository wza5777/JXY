package action;

import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import service.HibernateService;
import service.Service;
import utils.DateUtil;
import dao.Result;
import entity.AdminUser;
import entity.ImportBill;
import entity.Material;
import entity.Operator;
import entity.Proffer;

public class ImportBillAction extends BaseAction {

	private Service service;

	private Date importDate;

	private HibernateService hibernateService;

	private String id;

	private String mid;

	private String others;

	private Long number;

	private String profferId;

	private Double totalMoney;

	private Double importPrice;

	private ImportBill bill;

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public Date getImportDate() {
		return importDate;
	}

	public void setImportDate(Date importDate) {
		this.importDate = importDate;
	}

	public HibernateService getHibernateService() {
		return hibernateService;
	}

	public void setHibernateService(HibernateService hibernateService) {
		this.hibernateService = hibernateService;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}

	public String getProfferId() {
		return profferId;
	}

	public void setProfferId(String profferId) {
		this.profferId = profferId;
	}

	public Double getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(Double totalMoney) {
		this.totalMoney = totalMoney;
	}

	public Double getImportPrice() {
		return importPrice;
	}

	public void setImportPrice(Double importPrice) {
		this.importPrice = importPrice;
	}

	public ImportBill getBill() {
		return bill;
	}

	public void setBill(ImportBill bill) {
		this.bill = bill;
	}

	public void infos() {
		// 参数
		String limit = this.servletRequest.getParameter("limit");
		String page = this.servletRequest.getParameter("page");
		int st = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
		// 查询结果
		Result result = this.service.find(
				"from ImportBill a order by a.importDate desc",
				new String[] {}, st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from ImportBill ");
		List<ImportBill> list = (List<ImportBill>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (ImportBill a : (List<ImportBill>) list) {
			String operator = (String) this.service
					.find(
							"select u.name from ImportBill a left join a.operator u where a.id=?",
							new String[] { a.getId() }).get(0);

			String materialname = (String) this.service
					.find(
							"select u.fullName from ImportBill a left join a.material u where a.id=?",
							new String[] { a.getId() }).get(0);

			String proffer = (String) this.service
					.find(
							"select u.fullName from ImportBill a left join a.proffer u where a.id=?",
							new String[] { a.getId() }).get(0);

			jsono.put("importDate", DateUtil.formatDate(a.getImportDate()));
			jsono.put("others", a.getOthers());
			jsono.put("operator", operator);
			jsono.put("materialname", materialname);
			jsono.put("number", a.getNumber());
			jsono.put("code", a.getCode());
			jsono.put("id", a.getId());
			jsono.put("proffer", proffer);
			jsono.put("importPrice", a.getImportPrice());
			jsono.put("totalMoney", a.getTotalMoney());
			jsono.put("flag", a.getFlag());
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
			 * 操作员
			 */
			Operator o = (Operator) this.getSession().get("operator");
			bill.setOperator(o);
			/**
			 * 材料
			 */
			Material material = (Material) this.service.getObject(
					Material.class, mid);
			bill.setMaterial(material);
			/**
			 * 材料供应商
			 */
			Proffer proffer = (Proffer) this.service.getObject(Proffer.class,
					profferId);
			bill.setProffer(proffer);

			/**
			 * 计算总价
			 */
			Double totalMoney = bill.getImportPrice() * bill.getNumber();
			bill.setTotalMoney(totalMoney);

			this.hibernateService.save(bill);

			jsono.put("msg", "保存成功！");
			jsono.put("success", "true");
		} catch (Exception e) {
			e.printStackTrace();
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void delete() {
		String id = this.servletRequest.getParameter("id");

		JSONObject jsono = new JSONObject();
		ImportBill b = (ImportBill) this.service
				.getObject(ImportBill.class, id);

		if (b.getFlag() == 2) {
			this.service.removeObject(ImportBill.class, id);
			jsono.put("msg", "删除成功");
		}
		if (b.getFlag() == 0) {
			jsono.put("msg", "采购清单正在等待管理员批复，不能删除");
		} else {
			jsono.put("msg", "采购清单已被管理员批复，不能删除");
		}

		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 管理员批复清单
	 */
	public void update_approve() {
		AdminUser p = (AdminUser) this.getSession().get("adminuser");
		ImportBill b = (ImportBill) this.service
				.getObject(ImportBill.class, id);
		b.setFlag(1L);
		b.setAdmin(p);
		this.hibernateService.saveOrUpdate(b);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "已批复");
		JsonResult.json(jsono.toString(), servletResponse);
	}

}
