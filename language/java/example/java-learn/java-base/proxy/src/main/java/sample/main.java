package sample;

/**
 * @author fwz
 * @date 2019-02-13 10:16
 * @desc
 */
public class main {
    public static void main(String[] args) throws Exception {
        BaseService mike = ProxyFactory.build(Person.class);
        mike.eat();
        mike.sleep();
    }
}
