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
 * 消耗清单
 * 
 * @author huang
 * 
 */
@Entity
@Table(name = "export_bill")
public class ExportBill {

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
	protected java.util.Date exportDate;

	@Column(nullable = true)
	private String code;

	@Column(nullable = false)
	private Long number = 0L;

	@Column(nullable = true)
	private String others;

	/**
	 * 是否允许材料出库,等待批复为0，已批复为1，退回为2
	 */
	@Column(nullable = true)
	private Long flag = 0L;
	/**
	 * 管理员，批复人员
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "adminId")
	private AdminUser admin;

	/**
	 * 材料
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "materialId", nullable = false)
	private Material material;

	/**
	 * 操作员
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "operatorId", nullable = false)
	private Operator operator;

	/**
	 * 出库为1 ，未出为0
	 */
	@Column(nullable = true)
	private int exportFlag;

	public int getExportFlag() {
		return exportFlag;
	}

	public void setExportFlag(int exportFlag) {
		this.exportFlag = exportFlag;
	}

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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public Material getMaterial() {
		return material;
	}

	public void setMaterial(Material material) {
		this.material = material;
	}

	public Operator getOperator() {
		return operator;
	}

	public void setOperator(Operator operator) {
		this.operator = operator;
	}

	public java.util.Date getExportDate() {
		return exportDate;
	}

	public void setExportDate(java.util.Date exportDate) {
		this.exportDate = exportDate;
	}

	public Long getFlag() {
		return flag;
	}

	public void setFlag(Long flag) {
		this.flag = flag;
	}

}
