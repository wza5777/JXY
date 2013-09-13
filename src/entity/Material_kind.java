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
 * 材料类型
 * 
 * @author huang
 * 
 */
@Entity
@Table(name = "material_kind")
public class Material_kind {

	@Id
	@GenericGenerator(name = "idGenerator", strategy = "uuid")
	@GeneratedValue(generator = "idGenerator")
	@Column(name = "id", unique = true, nullable = false)
	private String id;

	/**
	 * 全称
	 */
	@ExcelAnnotation(name = "材料类别名称", id = 1, width = 20)
	@Column(name = "fullName", nullable = false)
	private String fullName;

	/**
	 * 创建日期
	 */
	@ExcelAnnotation(name = "添加日期", id = 3, width = 20)
	@Temporal(TemporalType.TIMESTAMP)
	@Column(unique = false, nullable = false)
	protected java.util.Date createDate;

	/**
	 * 编号
	 */
	@ExcelAnnotation(name = "编号", id = 2, width = 20)
	@Column(nullable = false)
	private String code;

	/**
	 * 操作员
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "operatorId", nullable = false)
	private Operator operator;

	/**
	 * 材料
	 */
	@OneToMany(mappedBy = "material_kind", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Material> materials;

	/**
	 * 备注
	 */
	@ExcelAnnotation(name = "备注", id = 4, width = 20)
	private String others;

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Operator getOperator() {
		return operator;
	}

	public void setOperator(Operator operator) {
		this.operator = operator;
	}

	public List<Material> getMaterials() {
		return materials;
	}

	public void setMaterials(List<Material> materials) {
		this.materials = materials;
	}

}
