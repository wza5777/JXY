package entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * 商品管理员角色
 * 
 * @author huang
 * 
 */
@Entity
@Table(name = "good_manager_role")
public class GoodManagerRole extends BaseEntity {

	public GoodManagerRole() {
	}

	/**
	 * 角色名称
	 */
	@Column(nullable = false, unique = true, length = 30)
	private String rolename;

	@OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<GoodManager> goodManagers;

	/**
	 * 角色编号
	 */
	@Column
	private String code;

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<GoodManager> getGoodManagers() {
		return goodManagers;
	}

	public void setGoodManagers(List<GoodManager> goodManagers) {
		this.goodManagers = goodManagers;
	}

}
