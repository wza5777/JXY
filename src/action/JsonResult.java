package action;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

public class JsonResult {

	public static void json(String json, HttpServletResponse servletResponse) {
		if (json != null) {
			servletResponse.setCharacterEncoding("UTF-8");
			try {
				servletResponse.getWriter().write(json);
				servletResponse.flushBuffer();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
	}

}
