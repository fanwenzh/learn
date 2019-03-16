package Email.smtp;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
/**
 * @author fwz
 * @date 2019-03-15 19:20
 * @desc 发送Email
 *       SMTP协议: 标准端口25, 加密端口465/587
 * @use  // 创建Session
 *       Session session = Session.getInstance(props, new Authenticator(){});
 *       // 创建Message对象
 *       MimeMessage message = new MimeMessage(session);
 *       message.setFrom(new InternetAddress("from@email.com"));
 *       message.setRecipient(Message.RecipientType.TO, new InternetAddress("to@mail.com");
 *       message.setSubject("RE: how to use JavaMail", "UTF-8");
 *       message.setText("blabla...", "UTF-8");
 *
 *       // 发送邮件
 *       Transport.send(message)
 */
public class SendMail {

    final String smtpHost;
    final String username;
    final String password;
    final boolean debug;

    public SendMail(String smtpHost, String username, String password) {
        this.smtpHost = smtpHost;
        this.username = username;
        this.password = password;
        this.debug = true;
    }

    public static void main(String[] args) throws MessagingException {
        SendMail sender = new SendMail("smtp.sina.com", "javacourse001@sina.com", "java-12345678");
        Session session = sender.createSSLSession();
        Message message = createTextMessage(session, "javacourse001@sina.com", "javacourse001@163.com", "Java邮件测试",
                "Hello, 这是一封javamail测试邮件！");
        Transport.send(message);
    }

    Session createSSLSession() {
        Properties props = new Properties();
        props.put("mail.smtp.host", this.smtpHost); // SMTP主机名
        props.put("mail.smtp.port", "465"); // 主机端口号
        props.put("mail.smtp.auth", "true"); // 是否需要用户认证
        // 启动SSL:
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.socketFactory.port", "465");
        return createSession(props);
    }

    Session createTLSSession() {
        Properties props = new Properties();
        props.put("mail.smtp.host", this.smtpHost); // SMTP主机名
        props.put("mail.smtp.port", "587"); // 主机端口号
        props.put("mail.smtp.auth", "true"); // 是否需要用户认证
        props.put("mail.smtp.starttls.enable", "true"); // 启用TLS加密
        return createSession(props);
    }

    Session createInsecureSession(String host, String username, String password) {
        Properties props = new Properties();
        props.put("mail.smtp.host", this.smtpHost); // SMTP主机名
        props.put("mail.smtp.port", "25"); // 主机端口号
        props.put("mail.smtp.auth", "true"); // 是否需要用户认证
        return createSession(props);
    }

    static Message createTextMessage(Session session, String from, String to, String subject, String body)
            throws MessagingException {
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
        message.setSubject(subject, "UTF-8");
        message.setText(body, "UTF-8");
        return message;
    }

     public Session createSession(Properties props) {
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(SendMail.this.username, SendMail.this.password);
            }
        });
        session.setDebug(this.debug); // 显示调试信息
        return session;
    }
}
