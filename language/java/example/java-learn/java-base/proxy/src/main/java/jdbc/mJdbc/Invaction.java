package jdbc.mJdbc;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

/**
 * @author fwz
 * @date 2019-02-13 14:34
 * @desc
 */
public class Invaction implements InvocationHandler {
    private SqlSession sqlSession;
    Connection con = null;
    PreparedStatement pStatement = null;

    public Invaction(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 初始化
        init();
        // 主要业务
        Field ps = sqlSession.getClass().getDeclaredField("ps");
        ps.setAccessible(true);
        ps.set(sqlSession, pStatement);
        Object res = method.invoke(proxy, args);
        // 关闭通道
        close();
        return res;
    }

    // 次要业务
    private void init() throws Exception{
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager.getConnection("jdbc:mysql://localhost:3006/test", "root", "password");
        pStatement = con.prepareStatement("");
    }

    private void close() throws Exception{
        if (con != null) {
            con.close();
        }
        if (pStatement != null) {
            pStatement.close();
        }
    }
}
