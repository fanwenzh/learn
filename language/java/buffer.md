```java
// put data array
byte[] sequenceHeader = ByteBuffer.allocate(4).putInt(sequenceNumber).array();
ByteBuffer bb = ByteBuffer.allocate(this.mtu);
bb.put(sequenceHeader)
// put Int directly
bb.putInt(sequenceNumber)

// get data
ByteBuffer totalBuffer = ByteBuffer.wrap(receivePacket.getData());
sequenceNumber = totalBuffer.getInt();
// byte operation
byte[] b = new byte[4];
ByteBuffer bb = ByteBuffer.wrap(packet.getData());
int seq1 = bb.get(b,0,4).getInt();
```