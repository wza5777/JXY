package action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import pojo.Permissions;
import service.Service;
import entity.Operator;

public class LimitOperatorAction extends BaseAction {

	private String id;

	private String[] ids;

	private Service service;

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 获取操作员权限文件夹
	 * 
	 * @return
	 */
	private String getLimitPath() {
		return ServletActionContext.getServletContext().getRealPath(
				"/JXY/js/operator_limit/");
	}

	/**
	 * 根据操作员的id获取操作员对象
	 * 
	 * @return
	 */
	private Operator getOperator() {
		Operator operator = (Operator) this.service.getObject(Operator.class,
				id);
		return operator;
	}

	/**
	 * 获取系统中所有的权限信息
	 */
	public void getLimitInfo_all() {
		JSONArray array = new JSONArray();
		LimitAction limitAction = new LimitAction();
		try {
			List<Permissions> ps = limitAction.getPermissions(limitAction
					.getLimitPath());
			if (ps != null) {
				Map<String, List<Permissions>> map = new HashMap<String, List<Permissions>>();
				Set<String> groupfuls = new HashSet<String>();
				for (Permissions p : ps) {
					groupfuls.add(p.getGroupful());
				}
				for (String s : groupfuls) {
					List<Permissions> list = new ArrayList<Permissions>();
					for (Permissions p : ps) {
						if (s.equals(p.getGroupful())) {
							list.add(p);
						}
					}
					map.put(s, list);
				}
				Iterator it = map.keySet().iterator();
				while (it.hasNext()) {
					String groupful = (String) it.next();
					JSONObject j = new JSONObject();
					j.put("text", groupful);
					j.put("id", groupful);
					j.put("leaf", false);
					j.put("checked", false);
					j.put("expanded", true);
					JSONArray a = new JSONArray();
					JSONObject o = new JSONObject();
					for (Permissions p : map.get(groupful)) {
						o.put("text", p.getName());
						o.put("id", p.getCode());
						o.put("leaf", true);
						o.put("checked", false);
						a.add(o);
						o.clear();
					}
					j.put("children", a.toString());
					array.add(j);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		JsonResult.json(array.toString(), servletResponse);
	}

	/**
	 * 获取权限文件
	 * 
	 * @param operator
	 * @return
	 */
	public String getLimitFile(Operator operator) {
		return operator.getLimitFile();
	}

	/**
	 * 获取权限节点
	 * 
	 * @return
	 * @throws IOException
	 */
	public List<Permissions> getOperatorPermissions() throws IOException {
		LimitAction limitAction = new LimitAction();
		if (this.getLimitFile(this.getOperator()) != null) {
			String filepath = this.getGenPath()
					+ this.getLimitFile(this.getOperator());
			return limitAction.getPermissions(filepath);
		} else {
			return null;
		}
	}

	/**
	 * 获取操作员的所有权限节点
	 */
	public void getOperatorLimit_all() {
		JSONArray array = new JSONArray();
		try {
			List<Permissions> ps = this.getOperatorPermissions();
			if (ps != null) {
				Map<String, List<Permissions>> map = new HashMap<String, List<Permissions>>();
				Set<String> groupfuls = new HashSet<String>();
				for (Permissions p : ps) {
					groupfuls.add(p.getGroupful());
				}
				for (String s : groupfuls) {
					List<Permissions> list = new ArrayList<Permissions>();
					for (Permissions p : ps) {
						if (s.equals(p.getGroupful())) {
							list.add(p);
						}
					}
					map.put(s, list);
				}
				Iterator it = map.keySet().iterator();
				while (it.hasNext()) {
					String groupful = (String) it.next();
					JSONObject j = new JSONObject();
					j.put("text", groupful);
					j.put("id", groupful);
					j.put("leaf", false);
					j.put("checked", true);
					j.put("expanded", true);
					JSONArray a = new JSONArray();
					JSONObject o = new JSONObject();
					for (Permissions p : map.get(groupful)) {
						o.put("text", p.getName());
						o.put("id", p.getCode());
						o.put("leaf", true);
						o.put("checked", true);
						a.add(o);
						o.clear();
					}
					j.put("children", a.toString());
					array.add(j);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		JsonResult.json(array.toString(), servletResponse);
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
	 * 更新操作员的权限文件
	 */
	public void update() {
		JSONObject j = new JSONObject();
		j.put("success", true);
		if (this.getLimitFile(this.getOperator()) != null) {
			try {
				LimitAction limitAction = new LimitAction();
				List<Permissions> ps = limitAction.getPermissions(limitAction
						.getLimitPath());
				List<Permissions> limits = new ArrayList<Permissions>();
				String filepath = this.getGenPath()
						+ this.getLimitFile(this.getOperator());
				if (ps != null) {
					for (Permissions p : ps) {
						for (String id : ids) {
							if (p.getCode().equals(id)) {
								limits.add(p);
							}
						}
					}
				}
				if (limits.size() > 0) {
					String json = limitAction.listToJson(limits);
					if (limitAction.clearFile(filepath) == true) {
						if (limitAction.resetFile(json, filepath) == true) {
							j.put("msg", "权限文件更新成功");
						} else {
							j.put("msg", "权限文件更新失败");
						}
					} else {
						j.put("msg", "权限文件更新失败");
					}
				}

			} catch (IOException e) {
				j.put("msg", "权限文件更新失败");
				e.printStackTrace();
			}

		} else {
			j.put("msg", "权限文件更新失败");
		}
		JsonResult.json(j.toString(), servletResponse);
	}

	public String[] getIds() {
		return ids;
	}

	public void setIds(String[] ids) {
		this.ids = ids;
	}

}
