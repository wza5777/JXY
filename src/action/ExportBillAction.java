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
import entity.ExportBill;
import entity.ImportBill;
import entity.Material;
import entity.Operator;
import entity.StockOut;
import entity.StockTotal;

public class ExportBillAction extends BaseAction {

	private Service service;

	private Date exportDate;

	private HibernateService hibernateService;

	private String id;

	private String mid;

	private String others;

	private Long number;

	private ExportBill bill;

	private int flag;

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public Date getExportDate() {
		return exportDate;
	}

	public void setExportDate(Date exportDate) {
		this.exportDate = exportDate;
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

	public ExportBill getBill() {
		return bill;
	}

	public void setBill(ExportBill bill) {
		this.bill = bill;
	}

	public void infos() {
		// 参数
		String limit = this.servletRequest.getParameter("limit");
		String page = this.servletRequest.getParameter("page");
		int st = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
		// 查询结果
		Result result = this.service.find(
				"from ExportBill a order by a.exportDate desc",
				new String[] {}, st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from ExportBill ");
		List<ExportBill> list = (List<ExportBill>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (ExportBill a : (List<ExportBill>) list) {
			String operator = (String) this.service
					.find(
							"select u.name from ExportBill a left join a.operator u where a.id=?",
							new String[] { a.getId() }).get(0);

			String materialname = (String) this.service
					.find(
							"select u.fullName from ExportBill a left join a.material u where a.id=?",
							new String[] { a.getId() }).get(0);

			jsono.put("exportDate", DateUtil.formatDate(a.getExportDate()));
			jsono.put("others", a.getOthers());
			jsono.put("operator", operator);
			jsono.put("materialname", materialname);
			jsono.put("number", a.getNumber());
			jsono.put("code", a.getCode());
			jsono.put("id", a.getId());
			jsono.put("flag", a.getFlag());
			jsono.put("exportFlag", a.getExportFlag());
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
		this.service.removeObject(ExportBill.class, id);
		ExportBill b = (ExportBill) this.service
				.getObject(ExportBill.class, id);
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
		ExportBill b = (ExportBill) this.service
				.getObject(ExportBill.class, id);
		b.setFlag(1L);
		b.setAdmin(p);
		this.hibernateService.saveOrUpdate(b);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "已批复");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 材料出库
	 */
	public void save_export() {

		/**
		 * 查找出库清单
		 */
		ExportBill b = (ExportBill) this.service
				.getObject(ExportBill.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		if (b.getFlag() == 1 && b.getExportFlag() == 0) {
			/**
			 * 操作员
			 */
			Operator o = (Operator) this.getSession().get("operator");
			/**
			 * 查找材料
			 */

			List<Material> materials = (List<Material>) this.service
					.find(
							"select u from ExportBill a left join a.material u where a.id=?",
							new String[] { id });
			Material material = materials.get(0);
			/**
			 * 查找库存总计
			 */
			List<StockTotal> totals = (List<StockTotal>) this.service
					.find(
							"from StockTotal s where s.material.materialId=? order by s.createDate",
							new String[] { material.getMaterialId() });
			/**
			 * 材料出库
			 */
			StockTotal total = totals.get(0);
			total.setNumber(total.getNumber() - b.getNumber());
			this.hibernateService.saveOrUpdate(total);

			/**
			 * 生成出库记录
			 */
			StockOut out = new StockOut();
			out.setCreateDate(new Date());
			out.setOperator(o);
			out.setNumber(b.getNumber());
			out.setMaterial(material);
			this.hibernateService.saveOrUpdate(out);

			/**
			 * 更新出库清单信息
			 */
			b.setExportFlag(1);
			this.hibernateService.saveOrUpdate(b);
			jsono.put("msg", "已批复");
		}
		if (b.getFlag() == 0) {
			jsono.put("msg", "对不起，现在不能出库，管理员未批复");
		}
		if (b.getExportFlag() == 1) {
			jsono.put("msg", "对不起，已出库");
		}
		JsonResult.json(jsono.toString(), servletResponse);
	}
}
