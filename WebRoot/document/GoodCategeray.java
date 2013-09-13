package entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "good_categeray")
public class GoodCategeray extends BaseEntity {
	/**
	 * 商品类别编号
	 */
	@Column
	private String code;

	/**
	 * 类别名称
	 */
	private String name;

	@OneToMany(mappedBy = "categeray", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Good> goods;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "managerId", nullable = false)
	private GoodManager manager;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Good> getGoods() {
		return goods;
	}

	public void setGoods(List<Good> goods) {
		this.goods = goods;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public GoodManager getManager() {
		return manager;
	}

	public void setManager(GoodManager manager) {
		this.manager = manager;
	}

}
