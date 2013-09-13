package action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import service.Service;
import utils.excel.ExcelExport;
import entity.Material;
import entity.Material_kind;
import entity.Proffer;

/**
 * 生成Excel文档
 * 
 * @author huang
 * 
 */
public class ExcelAction extends BaseAction {

	private Service service;

	private String flag;

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	/**
	 * 下载生成的表格
	 */
	public void list() {
		String filename = "";
		List models = new ArrayList();
		String className = "";
		if (flag.equals("proffer")) {
			filename = "材料供应商";
			models = this.service.getObjects(Proffer.class);
			className = "entity.Proffer";
		}
		if (flag.equals("material")) {
			filename = "材料";
			models = this.service.getObjects(Material.class);
			className = "entity.Material";
		}
		if (flag.equals("material_kind")) {
			filename = "材料类别";
			models = this.service.getObjects(Material_kind.class);
			className = "entity.Material_kind";
		}
		this.servletResponse.setCharacterEncoding("UTF-8");
		this.servletResponse.setContentType("application/vnd.ms-excel");// APPLICATION/OCTET-STREAM
		this.servletResponse.addHeader("Content-Disposition",
				"attachment; filename=\"" + new Date().getTime() + ".xls"
						+ "\"");
		java.io.OutputStream os;
		try {
			os = this.servletResponse.getOutputStream();
			os = ExcelExport.createExcel(models, className, os, filename);
			this.servletResponse.setStatus(this.servletResponse.SC_OK);
			this.servletResponse.flushBuffer();
			os.flush();
			os.close();
		} catch (IOException e) {
			this.servletResponse.reset();
			e.printStackTrace();
		}

	}
}
