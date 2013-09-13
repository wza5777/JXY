package entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 
 * @author huang
 * 
 */
@Entity
@Table(name = "admin_user")
public class AdminUser extends BaseEntity {

	public AdminUser() {
		this.registDate = new Date();
	}

	@Column(nullable = false, unique = true, length = 30)
	private String username;

	@Column(nullable = false, unique = true, length = 30)
	private String nickname;

	@Column(length = 30)
	private String address;

	@Column
	private String code;

	@Column(length = 30)
	private String telephone;

	@Column(nullable = false, length = 30)
	private String password;

	@Column(length = 30)
	private Long sex;

	@Column(length = 30)
	private String fax;

	@Column(length = 30)
	private String localphone;

	@Column(length = 30)
	private Long age;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(unique = false, nullable = false)
	private java.util.Date registDate;

	@Temporal(TemporalType.DATE)
	private java.util.Date birthDay;

	@OneToMany(mappedBy = "adminuser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Operator> operators;

	@OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ImportBill> bills;

	@OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ExportBill> bs;

	/**
	 * 管理员等级
	 */
	private int level;

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public java.util.Date getRegistDate() {
		return registDate;
	}

	public void setRegistDate(java.util.Date registDate) {
		this.registDate = registDate;
	}

	public java.util.Date getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(java.util.Date birthDay) {
		this.birthDay = birthDay;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getSex() {
		return sex;
	}

	public void setSex(Long sex) {
		this.sex = sex;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getLocalphone() {
		return localphone;
	}

	public void setLocalphone(String localphone) {
		this.localphone = localphone;
	}

	public Long getAge() {
		return age;
	}

	public void setAge(Long age) {
		this.age = age;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<Operator> getOperators() {
		return operators;
	}

	public void setOperators(List<Operator> operators) {
		this.operators = operators;
	}

	public List<ImportBill> getBills() {
		return bills;
	}

	public void setBills(List<ImportBill> bills) {
		this.bills = bills;
	}

	public List<ExportBill> getBs() {
		return bs;
	}

	public void setBs(List<ExportBill> bs) {
		this.bs = bs;
	}

}
