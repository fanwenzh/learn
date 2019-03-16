import java.util.*;

/**
 * @author fwz
 * @date 2019-03-14 13:05
 * @desc
 */
public class Main {
    public static void main(String[] args) {
        // List: ArrayList, LinkedList
        ArrayList<Integer> strings = new ArrayList<>();
        strings.add(0, 0);
        // strings.addAll()
        strings.get(0);
        strings.remove(0);
        // 遍历1
        ListIterator<Integer> integerListIterator = strings.listIterator();
        integerListIterator.hasNext();
        // 遍历2
        for(int i = 0; i < strings.size(); i++);
        // 相互转换
        Integer[] arr = (Integer[])strings.toArray();
        List<Integer> list = new ArrayList<Integer>(Arrays.asList(arr));
        // contains和indexOf方法需要实现equals

        // Map: HashMap, SortedMap
        HashMap<String, Integer> hashMap = new HashMap<>();
        hashMap.put("a", 1);
        hashMap.get("a");
        hashMap.containsKey("a"); hashMap.containsValue(1);
        // 遍历
        Set<String> strings1 = hashMap.keySet();
        Set<Map.Entry<String, Integer>> entries = hashMap.entrySet();
        // 以Object为key必须覆写equals方法, 辅助以hashCode

        // Set: HashSet, TreeSet implements SortedSet
        HashSet<Integer> set = new HashSet<>();
        set.add(1);
        set.contains(1);
        set.remove(1);
        // 遍历
        set.iterator();set.size();

        // Queue: ArrayDeque, LinkedList
        LinkedList<Integer> linkedList = new LinkedList<>();
        linkedList.add(1);linkedList.offer(1); // 后抛异常, 避免把null加入队列中
        linkedList.remove();linkedList.poll();
        linkedList.element();linkedList.peek();
        // PriorityQueue 实现Comparator接口
        // Deque extends Queue
        Deque<Integer> deque = new ArrayDeque<>();
        deque.addLast(1); deque.offerLast(1);
        deque.removeFirst(); deque.pollFirst();
        deque.getFirst();deque.peekFirst(); // deque.getLast();deque.peekLast();

        // 最佳实践iterator
//         Collections.shuffle();
//         Collections.sort();
    }
}
