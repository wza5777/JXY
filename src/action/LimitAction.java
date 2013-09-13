package action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import pojo.Permissions;

public class LimitAction extends BaseAction {

	private String name;

	private String code;

	private String purpose;

	private String groupful;

	private String fileid;

	private String codeid;

	private Permissions limit;

	public Permissions getLimit() {
		return limit;
	}

	public void setLimit(Permissions limit) {
		this.limit = limit;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getGroupful() {
		return groupful;
	}

	public void setGroupful(String groupful) {
		this.groupful = groupful;
	}

	public String getFileid() {
		return fileid;
	}

	public void setFileid(String fileid) {
		this.fileid = fileid;
	}

	public String getCodeid() {
		return codeid;
	}

	public void setCodeid(String codeid) {
		this.codeid = codeid;
	}

	/**
	 * 获取权限文件地址
	 * 
	 * @return
	 */
	public String getLimitPath() {
		return ServletActionContext.getServletContext().getRealPath(
				"/JXY/js/combobox/limit.js");
	}

	/**
	 * 从文件中获取json数据
	 * 
	 * @return
	 * @throws IOException
	 */
	public String getJson(String file) throws IOException {
		StringBuffer str = new StringBuffer();
		Reader reader = new InputStreamReader(new FileInputStream(
				new File(file)), "utf-8");
		char[] tempchars = new char[30];
		int charread = 0;
		while ((charread = reader.read(tempchars)) != -1) {
			if ((charread == tempchars.length)
					&& (tempchars[tempchars.length - 1] != '\r')) {
				str.append(tempchars);
			} else {
				for (int i = 0; i < charread; i++) {
					if (tempchars[i] == '\r') {
						continue;
					} else {
						str.append(tempchars[i]);
					}
				}
			}
		}
		if (reader != null) {
			reader.close();
		}
		return str.toString();
	}

	/**
	 * json字符串转换为对象
	 * 
	 * @return
	 * @throws IOException
	 */
	public List<Permissions> getPermissions(String file) throws IOException {
		String json = this.getJson(file);
		List<Permissions> list = new ArrayList<Permissions>();
		if (!json.equals("")) {
			JSONArray array = JSONArray.fromObject(json);
			list = JSONArray.toList(array, Permissions.class);
		}
		return list;
	}

	/**
	 * 创建一个权限节点
	 * 
	 * @return
	 */
	public Permissions createPermissions() {
		Permissions p = new Permissions();
		p = limit;
		return p;
	}

	/**
	 * 整合配置文件中的json对象与新增的权限节点对象
	 * 
	 * @return
	 * @throws IOException
	 */
	public List<Permissions> inter(String file) throws IOException {
		List<Permissions> ps = new ArrayList<Permissions>();
		ps.addAll(this.getPermissions(file));
		ps.add(this.createPermissions());
		return ps;
	}

	/**
	 * list转换为json字符串
	 * 
	 * @return
	 * @throws IOException
	 */
	public String listToJson(List<Permissions> ps) throws IOException {
		JSONArray array = JSONArray.fromObject(ps);
		String json = array.toString();
		return json;
	}

	/**
	 * 清空文件内容
	 * 
	 * @return
	 */
	public Boolean clearFile(String str) {
		File file = new File(str);
		FileWriter fw;
		Boolean flag = false;
		try {
			fw = new FileWriter(file);
			fw.write("");
			fw.close();
			flag = true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 重写权限文件
	 * 
	 * @param json
	 * @param str
	 * @return
	 */
	public Boolean resetFile(String json, String str) {
		File file = new File(str);
		Writer writer = null;
		Boolean flag = false;
		try {
			writer = new OutputStreamWriter(new FileOutputStream(file), "utf-8");
			writer.write(json);
			writer.close();
			flag = true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 添加一个权限节点
	 */
	public void save() {
		JSONObject j = new JSONObject();
		j.put("success", "true");
		try {
			String json = this.listToJson(this.inter(this.getLimitPath()));
			if (this.clearFile(getLimitPath()) == true) {
				if (this.resetFile(json, getLimitPath()) == true) {
					j.put("msg", "节点添加成功");
				} else {
					j.put("msg", "节点添加失败");
				}
			} else {
				j.put("msg", "节点添加失败");
			}
		} catch (IOException e) {
			j.put("msg", "节点添加失败");
			e.printStackTrace();
		}
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 从权限节点中删除一个
	 * 
	 * @return
	 * @throws IOException
	 */
	public List<Permissions> deletePermission() throws IOException {
		List<Permissions> ps = this.getPermissions(this.getLimitPath());
		if (ps != null) {
			for (Permissions p : ps) {
				if (p.getCode().equals(code)) {
					ps.remove(p);
					break;
				}
			}
		}
		return ps;
	}

	/**
	 * 删除权限节点 TODO 无法进行回滚操作
	 */
	public void delete() {
		JSONObject j = new JSONObject();
		j.put("success", "true");
		try {
			String json = this.listToJson(this.deletePermission());
			if (this.clearFile(getLimitPath()) == true) {
				if (this.resetFile(json, getLimitPath()) == true) {
					j.put("msg", "节点删除成功");
				} else {
					j.put("msg", "节点删除失败");
				}
			} else {
				j.put("msg", "节点删除失败");
			}
		} catch (IOException e) {
			j.put("msg", "节点删除失败");
			e.printStackTrace();
		}
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 更新权限节点
	 * 
	 * @return
	 * @throws IOException
	 */
	public List<Permissions> updatePermissions() throws IOException {
		List<Permissions> ps = this.getPermissions(this.getLimitPath());
		if (ps != null) {
			for (Permissions p : ps) {
				if (p.getCode().equals(codeid)) {
					ps.remove(p);
					Permissions per = new Permissions();
					per.setCode(code);
					per.setFileid(fileid);
					per.setGroupful(groupful);
					per.setName(name);
					per.setPurpose(purpose);
					ps.add(per);
					break;
				}
			}
		}
		return ps;
	}

	/**
	 * 节点更新
	 */
	public void update() {
		JSONObject j = new JSONObject();
		j.put("success", "true");
		try {
			String json = this.listToJson(this.updatePermissions());
			if (this.clearFile(getLimitPath()) == true) {
				if (this.resetFile(json, getLimitPath()) == true) {
					j.put("msg", "节点更新成功");
				} else {
					j.put("msg", "节点更新失败");
				}
			} else {
				j.put("msg", "节点更新失败");
			}
		} catch (IOException e) {
			j.put("msg", "节点更新失败");
			e.printStackTrace();
		}
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 查看权限节点信息
	 */
	public void info() {
		JSONObject j = new JSONObject();
		try {
			List<Permissions> ps = this.getPermissions(this.getLimitPath());
			if (ps != null) {
				for (Permissions p : ps) {
					if (p.getCode().equals(code)) {
						j = j.fromObject(p);
						break;
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		JsonResult.json(j.toString(), servletResponse);
	}

	/**
	 * 下载权限文件
	 */
	public void download() {
		File file = new File(this.getLimitPath());
		this.servletResponse.setCharacterEncoding("UTF-8");
		this.servletResponse.setContentType("application/x-javascript");// APPLICATION/OCTET-STREAM
		this.servletResponse.addHeader("Content-Disposition",
				"attachment; filename=\"" + "limit.js" + "\"");
		this.servletResponse.setContentLength((int) file.length());

		byte[] b = new byte[100];
		java.io.OutputStream os = null;
		java.io.InputStream is = null;
		try {
			is = new java.io.FileInputStream(file);
			os = this.servletResponse.getOutputStream();
			int len = 0;
			while ((len = is.read(b)) > 0) {
				os.write(b, 0, len);
			}
			this.servletResponse.setStatus(this.servletResponse.SC_OK);
			this.servletResponse.flushBuffer();
			os.flush();
			os.close();
			is.close();

		} catch (IOException e) {
			this.servletResponse.reset();
			e.printStackTrace();
		}
	}

}
