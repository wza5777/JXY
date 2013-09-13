package entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

import utils.excel.ExcelAnnotation;

/**
 * 材料
 * 
 * @author huang
 * 
 */
@Entity
@Table(name = "material")
public class Material {

	@Id
	@GenericGenerator(name = "idGenerator", strategy = "uuid")
	@GeneratedValue(generator = "idGenerator")
	@Column(name = "materialId", unique = true, nullable = false)
	private String materialId;

	/**
	 * 全称
	 */
	@ExcelAnnotation(name = "材料名称", id = 1, width = 20)
	@Column(name = "fullName", nullable = false)
	private String fullName;

	/**
	 * 编号
	 */
	@ExcelAnnotation(name = "编号", id = 2, width = 20)
	@Column(nullable = false)
	private String code;

	/**
	 * 单位
	 */
	@ExcelAnnotation(name = "单位", id = 3, width = 20)
	@Column(nullable = false)
	private String metricUnit;

	/**
	 * 产地
	 */
	@ExcelAnnotation(name = "产地", id = 4, width = 20)
	@Column(nullable = false)
	private String birthPlace;

	/**
	 * 单价
	 */
	@ExcelAnnotation(name = "单价", id = 5, width = 20)
	@Column(nullable = false)
	private String unitCost;

	/**
	 * 备注
	 */
	@ExcelAnnotation(name = "备注", id = 7, width = 20)
	private String others;

	/**
	 * 材料供应商
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "profferId", nullable = false)
	private Proffer proffer;

	/**
	 * 操作员
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "operatorId", nullable = false)
	private Operator operator;

	/**
	 * 填写日期
	 */
	@ExcelAnnotation(name = "添加日期", id = 6, width = 20)
	@Temporal(TemporalType.TIMESTAMP)
	@Column(unique = false, nullable = false)
	private java.util.Date createDate;

	/**
	 * 材料类别
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "kindId", nullable = false)
	private Material_kind material_kind;

	/**
	 * 入库记录
	 */
	@OneToMany(mappedBy = "material", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Stock> stocks;

	/**
	 * 出库记录
	 */
	@OneToMany(mappedBy = "material", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<StockOut> outs;

	/**
	 * 库存总计
	 */
	@OneToMany(mappedBy = "material", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<StockTotal> totals;

	/**
	 * 采购清单
	 */
	@OneToMany(mappedBy = "material", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ImportBill> bills;

	/**
	 * 材料消耗清单
	 */
	@OneToMany(mappedBy = "material", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ExportBill> bs;

	public List<ImportBill> getBills() {
		return bills;
	}

	public void setBills(List<ImportBill> bills) {
		this.bills = bills;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
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

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public Proffer getProffer() {
		return proffer;
	}

	public void setProffer(Proffer proffer) {
		this.proffer = proffer;
	}

	public Operator getOperator() {
		return operator;
	}

	public void setOperator(Operator operator) {
		this.operator = operator;
	}

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public Material_kind getMaterial_kind() {
		return material_kind;
	}

	public void setMaterial_kind(Material_kind material_kind) {
		this.material_kind = material_kind;
	}

	public List<Stock> getStocks() {
		return stocks;
	}

	public void setStocks(List<Stock> stocks) {
		this.stocks = stocks;
	}

	public List<StockTotal> getTotals() {
		return totals;
	}

	public void setTotals(List<StockTotal> totals) {
		this.totals = totals;
	}

	public List<StockOut> getOuts() {
		return outs;
	}

	public void setOuts(List<StockOut> outs) {
		this.outs = outs;
	}

	public List<ExportBill> getBs() {
		return bs;
	}

	public void setBs(List<ExportBill> bs) {
		this.bs = bs;
	}

}
