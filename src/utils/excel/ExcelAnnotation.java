package utils.excel;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 属性声明为excel列
 * 
 * @author huang
 * 
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface ExcelAnnotation {

	String name();// Excel列名

	int width();// Excel列宽

	int id();// Excel列ID

	String intValue() default "";// 当属性值是整数时，显示的替代信息

	boolean flag() default false;

}
