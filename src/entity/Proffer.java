package entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

import utils.excel.DateFormatAnnotation;
import utils.excel.ExcelAnnotation;

/**
 * 材料供货商
 * 
 * @author huang
 * 
 */
@Entity
@Table(name = "proffer")
public class Proffer {

	@Id
	@GenericGenerator(name = "idGenerator", strategy = "uuid")
	@GeneratedValue(generator = "idGenerator")
	@Column(name = "profferId", unique = true, nullable = false)
	protected String profferId;

	@ExcelAnnotation(name = "供应商名称", id = 1, width = 20)
	@Column(name = "fullName", nullable = false)
	private String fullName;

	@ExcelAnnotation(name = "移动电话号码", id = 2, width = 20)
	private String phone;

	@ExcelAnnotation(name = "地址", id = 3, width = 20)
	private String address;

	@ExcelAnnotation(name = "备注", id = 5, width = 20)
	private String others;

	@ExcelAnnotation(name = "联系人", id = 4, width = 20)
	private String contactPerson;

	@ExcelAnnotation(name = "性别", id = 6, width = 20, flag = true, intValue = "1=男,2=女")
	private int sex;

	@ExcelAnnotation(name = "邮箱地址", id = 7, width = 20)
	private String mail;

	@ExcelAnnotation(name = "邮编", id = 8, width = 20)
	private String postcode;

	private String qq;

	private String msn;

	@ExcelAnnotation(name = "网址", id = 9, width = 20)
	private String webset;

	@ExcelAnnotation(name = "传真", id = 10, width = 20)
	private String fax;

	// 职务总经理0，经理1
	@ExcelAnnotation(name = "职务", id = 11, width = 20, flag = true, intValue = "0=总经理,1=经理")
	private int position;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(unique = false, nullable = false)
	@ExcelAnnotation(name = "添加日期", id = 12, width = 20)
	@DateFormatAnnotation(isformat = true)
	protected java.util.Date createDate;

	/**
	 * 材料
	 */
	@OneToMany(mappedBy = "proffer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Material> materials;

	/**
	 * 采购清单
	 */
	@OneToMany(mappedBy = "proffer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ImportBill> bills;

	public List<ImportBill> getBills() {
		return bills;
	}

	public void setBills(List<ImportBill> bills) {
		this.bills = bills;
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

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public String getProfferId() {
		return profferId;
	}

	public void setProfferId(String profferId) {
		this.profferId = profferId;
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

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
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

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

}
