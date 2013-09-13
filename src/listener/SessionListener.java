package listener;

import java.util.HashSet;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class SessionListener implements HttpSessionListener {

	static final Log LOG = LogFactory.getLog(SessionListener.class);

	public void sessionCreated(HttpSessionEvent event) {

		HttpSession session = event.getSession();
		ServletContext application = session.getServletContext();

		HashSet sessions = (HashSet) application.getAttribute("sessions");
		if (sessions == null) {
			sessions = new HashSet();
			application.setAttribute("sessions", sessions);
		}

		sessions.add(session);
	}

	public void sessionDestroyed(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		ServletContext application = session.getServletContext();
		HashSet sessions = (HashSet) application.getAttribute("sessions");
		if (sessions != null && sessions.size() > 0) {
			if (sessions.contains(session)) {
				sessions.remove(session);
			}
		} else {
			if (LOG.isInfoEnabled()) {
				LOG.info("sessions不存在");
			}
		}
	}

}
