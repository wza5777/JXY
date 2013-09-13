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
import entity.Operator;
import entity.Stock;
import entity.StockOut;
import entity.StockTotal;

public class StockAction extends BaseAction {

	private Service service;

	private Date createDate;

	private HibernateService hibernateService;

	private Stock stock;

	private String id;

	private String mid;

	private String others;

	private Long number;

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
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

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
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

	/**
	 * 增加一个库存
	 */
	public void save() {
		Stock p = new Stock();
		/**
		 * 查找材料
		 */
		Material material = (Material) this.service.getObject(Material.class,
				mid);
		/**
		 * 查找库存总计
		 */
		List<StockTotal> totals = (List<StockTotal>) this.service
				.find(
						"from StockTotal s where s.material.materialId=? order by s.createDate",
						new String[] { mid });
		/**
		 * 保存操作员
		 */
		Operator o = (Operator) this.getSession().get("operator");
		p.setNumber(number);
		p.setOthers(others);
		p.setOperator(o);
		p.setMaterial(material);
		p.setCreateDate(new Date());
		this.hibernateService.saveOrUpdate(p);
		/**
		 * 判断是否有库存
		 */
		StockTotal total = new StockTotal();
		if (totals.size() == 0) {
			total.setMaterial(material);
			total.setNumber(number);
			total.setCreateDate(new Date());
		} else {
			total = totals.get(0);
			total.setNumber(number + total.getNumber());
		}
		this.hibernateService.saveOrUpdate(total);
		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "保存成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void delete() {
		String id = this.servletRequest.getParameter("id");
		this.service.removeObject(Stock.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("msg", "删除成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void infos() {
		// 参数
		String limit = this.servletRequest.getParameter("limit");
		String page = this.servletRequest.getParameter("page");
		int st = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
		// 查询结果
		Result result = this.service.find(
				"from Stock a order by a.createDate desc", new String[] {}, st,
				Integer.parseInt(limit));
		int total = this.service.count("select count(*) from Stock ");
		List<Stock> list = (List<Stock>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (Stock a : (List<Stock>) list) {
			String operator = (String) this.service
					.find(
							"select u.name from Stock a left join a.operator u where a.id=?",
							new String[] { a.getId() }).get(0);

			String materialname = (String) this.service
					.find(
							"select u.fullName from Stock a left join a.material u where a.id=?",
							new String[] { a.getId() }).get(0);

			jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
			jsono.put("others", a.getOthers());
			jsono.put("operator", operator);
			jsono.put("materialname", materialname);
			jsono.put("number", a.getNumber());
			jsono.put("id", a.getId());
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

	public void infos_total() {
		// 参数
		String limit = this.servletRequest.getParameter("limit");
		String page = this.servletRequest.getParameter("page");
		int st = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
		// 查询结果
		Result result = this.service.find(
				"from StockTotal a order by a.createDate desc",
				new String[] {}, st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from StockTotal ");
		List<StockTotal> list = (List<StockTotal>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (StockTotal a : (List<StockTotal>) list) {

			String materialname = (String) this.service
					.find(
							"select u.fullName from StockTotal a left join a.material u where a.id=?",
							new String[] { a.getId() }).get(0);

			jsono.put("materialname", materialname);
			jsono.put("number", a.getNumber());
			jsono.put("id", a.getId());
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
	 * 出库
	 */
	public void save_out() {
		/**
		 * 查找库存总计
		 */
		StockTotal total = (StockTotal) this.service.getObject(
				StockTotal.class, id);
		/**
		 * 查找材料
		 */
		Material material = (Material) this.service
				.find(
						"select m from StockTotal s left outer join s.material m where s.id=?",
						new String[] { id }).get(0);
		/**
		 * 操作员
		 */
		Operator o = (Operator) this.getSession().get("operator");
		/**
		 * 保存出库记录
		 */
		StockOut out = new StockOut();
		out.setCreateDate(new Date());
		out.setOperator(o);
		out.setNumber(number);
		out.setOthers(others);
		out.setMaterial(material);
		this.hibernateService.saveOrUpdate(out);
		/**
		 * 更新库存
		 */
		total.setNumber(total.getNumber() - number);
		this.hibernateService.saveOrUpdate(total);

		JSONObject jsono = new JSONObject();
		jsono.put("success", true);
		jsono.put("msg", "出库成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	public void infos_out() {
		// 参数
		String limit = this.servletRequest.getParameter("limit");
		String page = this.servletRequest.getParameter("page");
		int st = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
		// 查询结果
		Result result = this.service.find(
				"from StockOut a order by a.createDate desc", new String[] {},
				st, Integer.parseInt(limit));
		int total = this.service.count("select count(*) from StockOut ");
		List<StockOut> list = (List<StockOut>) result.getData();
		// JSON声明
		JSONArray jsonArray = new JSONArray();
		JSONObject jsono = new JSONObject();
		// 拼写JSON字符串
		for (StockOut a : (List<StockOut>) list) {
			String operator = (String) this.service
					.find(
							"select u.name from StockOut a left join a.operator u where a.id=?",
							new String[] { a.getId() }).get(0);

			String materialname = (String) this.service
					.find(
							"select u.fullName from StockOut a left join a.material u where a.id=?",
							new String[] { a.getId() }).get(0);

			jsono.put("createDate", DateUtil.formatDate(a.getCreateDate()));
			jsono.put("others", a.getOthers());
			jsono.put("operator", operator);
			jsono.put("materialname", materialname);
			jsono.put("number", a.getNumber());
			jsono.put("id", a.getId());
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

	public void delete_out() {
		String id = this.servletRequest.getParameter("id");
		this.service.removeObject(StockOut.class, id);
		JSONObject jsono = new JSONObject();
		jsono.put("msg", "删除成功");
		JsonResult.json(jsono.toString(), servletResponse);
	}

	/**
	 * 得到商品的库存数量
	 */
	public void get_number() {
		JSONObject jsono = new JSONObject();
		List<StockTotal> totals = (List<StockTotal>) this.service
				.find(
						"from StockTotal s where s.material.materialId=? order by s.createDate",
						new String[] { mid });
		StockTotal total;
		if (totals.size() > 0) {
			total = totals.get(0);
			jsono.put("number", total.getNumber());
		} else {
			jsono.put("number", 0);
		}
		jsono.put("success", "true");
		JsonResult.json(jsono.toString(), servletResponse);
	}

}
