package sample;

/**
 * @author fwz
 * @date 2019-02-13 11:08
 * @desc
 */
public class Person implements BaseService {
    @Override
    public void eat() {
        System.out.println("eat function");
    }

    @Override
    public void sleep() {
        System.out.println("sleep function");
    }
}
