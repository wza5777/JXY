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

/**
 * 操作员
 * 
 * @author huang
 * 
 */
@Entity
@Table(name = "operator")
public class Operator {

	@Id
	@GenericGenerator(name = "idGenerator", strategy = "uuid")
	@GeneratedValue(generator = "idGenerator")
	@Column(name = "id", unique = true, nullable = false)
	private String id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private int sex;

	private String home;

	private String phone;

	@Column(nullable = false)
	private String others;

	/**
	 * 管理员
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "adminuserId", nullable = false)
	private AdminUser adminuser;

	/**
	 * 创建日期
	 */
	@Temporal(TemporalType.TIMESTAMP)
	@Column(unique = false, nullable = false)
	protected java.util.Date createDate;

	/**
	 * 材料
	 */
	@OneToMany(mappedBy = "operator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Material> materials;

	/**
	 * 材料类别
	 */
	@OneToMany(mappedBy = "operator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Material_kind> material_kinds;

	/**
	 * 库存
	 */
	@OneToMany(mappedBy = "operator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Stock> stocks;

	/**
	 * 采购清单
	 */
	@OneToMany(mappedBy = "operator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ImportBill> bills;

	/**
	 * 权限文件位置
	 */
	private String limitFile;

	public List<ImportBill> getBills() {
		return bills;
	}

	public void setBills(List<ImportBill> bills) {
		this.bills = bills;
	}

	public List<Stock> getStocks() {
		return stocks;
	}

	public void setStocks(List<Stock> stocks) {
		this.stocks = stocks;
	}

	public List<Material_kind> getMaterial_kinds() {
		return material_kinds;
	}

	public void setMaterial_kinds(List<Material_kind> material_kinds) {
		this.material_kinds = material_kinds;
	}

	public List<Material> getMaterials() {
		return materials;
	}

	public void setMaterials(List<Material> materials) {
		this.materials = materials;
	}

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public AdminUser getAdminuser() {
		return adminuser;
	}

	public void setAdminuser(AdminUser adminuser) {
		this.adminuser = adminuser;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public String getHome() {
		return home;
	}

	public void setHome(String home) {
		this.home = home;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLimitFile() {
		return limitFile;
	}

	public void setLimitFile(String limitFile) {
		this.limitFile = limitFile;
	}

}
