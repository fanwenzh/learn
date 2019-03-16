package jdbc;

import jdbc.mJdbc.DeptMapper;
import jdbc.mJdbc.SqlSession;
import jdbc.mJdbc.SqlSessionFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

/**
 * @author fwz
 * @date 2019-02-13 11:19
 * @desc
 */
public class main {
    public static void main(String[] args) throws Exception{
        //原始jdbc方式
		Connection con = null;
		PreparedStatement pStatement = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3006/test");
			con.setAutoCommit(false);
			pStatement = con.prepareStatement("insert into dept value(?,?,?)");
			pStatement.setInt(1, 1009);
			pStatement.setString(2, "test");
			pStatement.setString(3, "test");

			pStatement.executeUpdate();
			con.commit();
		} catch (Exception e) {
			con.rollback();
			e.printStackTrace();
		} finally {
			if (pStatement != null) {
				pStatement.close();
			}
			if (con != null) {
				con.close();
			}
		}

		// mJDBC方法
        SqlSession dao = SqlSessionFactory.build(DeptMapper.class);
//		String sql = "insert into dept values(50, 'TEST', 'Beijing')";
//		dao.save(sql);

        // 模仿mapper
        Map StatementMapper = new HashMap();
		StatementMapper.put("dept.save","insert into dept values(50, 'TEST', 'Beijing')");
        dao.save((String)StatementMapper.get("dept.save"));

    }
}
