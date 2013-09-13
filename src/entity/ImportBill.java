package entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

/**
 * 进货清单
 * 
 * @author huang
 * 
 */
@Entity
@Table(name = "import_bill")
public class ImportBill {

	@Id
	@GenericGenerator(name = "idGenerator", strategy = "uuid")
	@GeneratedValue(generator = "idGenerator")
	@Column(name = "id", unique = true, nullable = false)
	private String id;

	/**
	 * 创建日期
	 */
	@Temporal(TemporalType.TIMESTAMP)
	@Column(unique = false, nullable = false)
	protected java.util.Date importDate;

	@Column(nullable = true)
	private String code;

	@Column(nullable = true)
	private Double importPrice = 0.00;

	@Column(nullable = false)
	private Long number = 0L;

	@Column(nullable = false)
	private Double totalMoney = 0.00;

	@Column(nullable = true)
	private String others;

	/**
	 * 是否允许采购,等待批复为0，已批复为1，退回为2
	 */
	@Column(nullable = true)
	private Long flag = 0L;

	/**
	 * 材料
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "materialId", nullable = false)
	private Material material;

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
	 * 管理员，批复人员
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "adminId")
	private AdminUser admin;

	public AdminUser getAdmin() {
		return admin;
	}

	public void setAdmin(AdminUser admin) {
		this.admin = admin;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public java.util.Date getImportDate() {
		return importDate;
	}

	public void setImportDate(java.util.Date importDate) {
		this.importDate = importDate;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Double getImportPrice() {
		return importPrice;
	}

	public void setImportPrice(Double importPrice) {
		this.importPrice = importPrice;
	}

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}

	public Double getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(Double totalMoney) {
		this.totalMoney = totalMoney;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public Long getFlag() {
		return flag;
	}

	public void setFlag(Long flag) {
		this.flag = flag;
	}

	public Material getMaterial() {
		return material;
	}

	public void setMaterial(Material material) {
		this.material = material;
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

}
