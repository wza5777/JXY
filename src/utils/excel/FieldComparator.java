package utils.excel;

import java.lang.reflect.Field;
import java.util.Comparator;

@SuppressWarnings("unchecked")
public class FieldComparator implements Comparator {

	public int compare(Object arg0, Object arg1) {
		Field fieldOne = (Field) arg0;
		Field fieldTwo = (Field) arg1;
		ExcelAnnotation annoOne = fieldOne.getAnnotation(ExcelAnnotation.class);
		ExcelAnnotation annoTwo = fieldTwo.getAnnotation(ExcelAnnotation.class);
		return annoOne.id() - annoTwo.id();
	}

}