package jdbc.mJdbc;

import java.sql.PreparedStatement;

/**
 * @author fwz
 * @date 2019-02-13 14:31
 * @desc
 */
public class DeptMapper implements SqlSession{
    PreparedStatement ps;

    @Override
    public int save(String sql) throws Exception{
        int num = ps.executeUpdate(sql);
        return num;
    }
}
