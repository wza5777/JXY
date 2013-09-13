package action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import pojo.MenuTree;
import pojo.Permissions;

/**
 * 菜单树操作
 * 
 * @author huang
 * 
 */
public class MenuAction extends BaseAction {

	private String id;

	private Boolean leaf;

	private String iconCls;

	private String text;

	private String parentId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	/**
	 * 获取基础菜单文件
	 * 
	 * @return
	 */
	public String getMenuFilePath() {
		return this.getGenPath() + "JXY/js/menus/menu.js";
	}

	/**
	 * 从文件中提取菜单对象
	 * 
	 * @param file
	 * @return
	 * @throws IOException
	 */
	public List<MenuTree> getMenuTrees(String file) throws IOException {
		LimitAction limit = new LimitAction();
		String json = limit.getJson(file);
		List<MenuTree> list = new ArrayList<MenuTree>();
		if (!json.equals("")) {
			JSONArray array = JSONArray.fromObject(json);
			list = JSONArray.toList(array, MenuTree.class);
		}
		return list;
	}

	/**
	 * 获取权限节点
	 * 
	 * @return
	 * @throws IOException
	 */
	public List<Permissions> getOperatorPermissions() throws IOException {
		LimitAction limitAction = new LimitAction();
		LimitOperatorAction lio = new LimitOperatorAction();
		if (lio.getLimitFile(this.getCurrentOperator()) != null) {
			String filepath = this.getGenPath()
					+ lio.getLimitFile(this.getCurrentOperator());
			return limitAction.getPermissions(filepath);
		} else {
			return null;
		}
	}

	/**
	 * 装配菜单
	 */
	public void completeMenu() {
		JSONArray array = new JSONArray();
		try {
			List<MenuTree> mts = this.getMenuTrees(this.getMenuFilePath());
			List<Permissions> ps = this.getOperatorPermissions();

			List<MenuTree> menus = new ArrayList<MenuTree>();
			if (mts.size() > 0) {
				for (MenuTree m : mts) {
					for (Permissions p : ps) {
						if (m.getId().equals(p.getFileid())) {
							menus.add(m);
						}
					}
				}
			}

			if (menus.size() > 0) {
				Map<String, List<MenuTree>> map = new HashMap<String, List<MenuTree>>();
				Set<String> pids = new HashSet<String>();
				for (MenuTree t : menus) {
					pids.add(t.getParentId());
				}
				for (String s : pids) {
					List<MenuTree> list = new ArrayList<MenuTree>();
					for (MenuTree t : menus) {
						if (s.equals(t.getParentId())) {
							list.add(t);
						}
					}
					map.put(s, list);
				}
				Iterator iterator = map.keySet().iterator();
				while (iterator.hasNext()) {
					String parentId = (String) iterator.next();
					for (MenuTree r : mts) {
						if (parentId.equals(r.getId())) {
							JSONObject object = new JSONObject();
							object.put("text", r.getText());
							object.put("iconCls", r.getIconCls());
							object.put("leaf", r.getLeaf());
							object.put("id", r.getId());
							JSONArray j = new JSONArray();
							j.add(map.get(parentId));
							object.put("children", j.toString().substring(1,
									j.toString().length() - 1));
							array.add(object);
							break;
						}
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		JsonResult.json(array.toString(), servletResponse);
	}
}
