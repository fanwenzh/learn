import java.util.Arrays;

/**
 * @Author fwz
 * @Date 2019-03-13
 * @Description java-base
 */
public class Main {

    public static void main(String[] args) {
        int[] nums = {1,5, 2,3,4};
        int[] res = new int[2];
        int target = 5;
        Arrays.sort(nums);
        System.out.println(nums.toString());
        int l = 0, r = nums.length - 1;
        while(l < r) {
            if(nums[l] + nums[r] == target) {

            }
        }

    }
}
