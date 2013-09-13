package utils.excel;

import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.format.Pattern;
import jxl.format.UnderlineStyle;
import jxl.format.VerticalAlignment;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class ExcelExport {

	/**
	 * 生成Excel
	 * 
	 * @param models
	 *            封装需要到处的数据BEAN结合
	 * @param className
	 *            导成Excel的实体BEAN包名.类名
	 * @param excelName
	 *            生成的Excel名
	 */
	@SuppressWarnings("unchecked")
	public static OutputStream createExcel(List models, String className,
			OutputStream os, String excelName) {
		Class clasVo = null;
		try {
			clasVo = Class.forName(className);
			WritableWorkbook workbook = Workbook.createWorkbook(os);
			WritableSheet sheet = workbook.createSheet(excelName, 0);
			// 用于标题
			WritableFont titleFont = new WritableFont(WritableFont.ARIAL, 17,
					WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE,
					jxl.format.Colour.WHITE);
			WritableCellFormat wcf_title = new WritableCellFormat(titleFont);
			wcf_title.setBackground(Colour.TEAL, Pattern.SOLID);
			wcf_title.setBorder(Border.ALL, BorderLineStyle.DOUBLE,
					Colour.OCEAN_BLUE);
			wcf_title.setVerticalAlignment(VerticalAlignment.CENTRE); // 垂直对齐
			wcf_title.setAlignment(Alignment.CENTRE);

			// 用于正文
			WritableFont NormalFont = new WritableFont(WritableFont.TAHOMA, 11);
			WritableCellFormat wcf_center = new WritableCellFormat(NormalFont);
			wcf_center.setBorder(Border.ALL, BorderLineStyle.DOUBLE,
					Colour.GRAY_25);
			wcf_center.setVerticalAlignment(VerticalAlignment.CENTRE); // 垂直对齐
			wcf_center.setAlignment(Alignment.CENTRE);
			wcf_center.setWrap(true); // 是否换行

			sheet.addCell(new Label(0, 0, excelName, wcf_title));
			sheet.mergeCells(0, 0, clasVo.getDeclaredFields().length - 1, 0);

			// 获取属性
			Field[] fields = clasVo.getDeclaredFields();
			List<Field> fs = new ArrayList<Field>();
			// 获取含有excel注解的属性
			for (Field f : fields) {
				if (f.isAnnotationPresent(ExcelAnnotation.class)) {
					fs.add(f);
				}
			}
			Field[] fis = new Field[fs.size()];
			for (int i = 0; i < fs.size(); i++) {
				fis[i] = fs.get(i);
			}
			// 按照注解id排序Excel列
			Arrays.sort(fis, new FieldComparator());
			for (int i = 0; i < fis.length; i++) {
				Field field = fis[i];
				if (field.isAnnotationPresent(ExcelAnnotation.class)) {
					// 获取该字段的注解对象
					ExcelAnnotation anno = field
							.getAnnotation(ExcelAnnotation.class);
					sheet.setColumnView(i, anno.width());
					sheet.addCell(new Label(i, 1, anno.name(), wcf_center));
				}
			}

			int rowId = 2;// 写入第几行 第一行为列头 数据从第二行开始写
			for (Object ssTopModel : models) {
				int columnId = 0;// 写入第几列 第一列为自动计算的行号 数据从第二列开始写
				// 获取该类 并获取自身方法
				Class clazz = ssTopModel.getClass();
				for (int i = 0; i < fis.length; i++) {
					Field field = fis[i];
					if (field.isAnnotationPresent(ExcelAnnotation.class)) {
						String methodName = "get"
								+ field.getName().substring(0, 1).toUpperCase()
								+ field.getName().substring(1);
						Method method = clazz.getMethod(methodName);
						Object value = method.invoke(ssTopModel) == null ? ""
								: method.invoke(ssTopModel);
						// 显示替换值
						ExcelAnnotation anno = field
								.getAnnotation(ExcelAnnotation.class);
						if (anno.flag() == true) {
							value = value.toString();
							String[] intValues = anno.intValue().split(",");
							for (String intValue : intValues) {
								String[] values = intValue.split("=");
								if (value.equals(values[0])) {
									value = values[1];
									break;
								}
							}
						}
						// 格式化日期yyyy-MM-dd HH:mm:ss
						if (field
								.isAnnotationPresent(DateFormatAnnotation.class)) {
							DateFormatAnnotation dfa = field
									.getAnnotation(DateFormatAnnotation.class);
							value = new SimpleDateFormat(dfa.format())
									.format(value);
						}
						try {
							sheet.addCell(new Label(columnId, rowId, value
									.toString(), wcf_center));
						} catch (IllegalArgumentException e) {
							e.printStackTrace();
						}
						columnId++;
					}
				}
				rowId++;
			}

			workbook.write();
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return os;
	}
}