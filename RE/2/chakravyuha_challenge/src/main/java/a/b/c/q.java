package a.b.c;

import java.nio.ByteBuffer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public final class q {
    private q() {
    }

    // Symmetric stream transform used for portal.dat (same operation for encrypt/decrypt).
    public static byte[] h(byte[] input, byte[] key, byte[] iv) {
        byte[] out = new byte[input.length];
        int counter = 0;
        int offset = 0;

        while (offset < input.length) {
            byte[] ks = block(key, iv, counter);
            int take = Math.min(ks.length, input.length - offset);
            for (int i = 0; i < take; i++) {
                out[offset + i] = (byte) (input[offset + i] ^ ks[i]);
            }
            counter++;
            offset += take;
        }
        return out;
    }

    private static byte[] block(byte[] key, byte[] iv, int counter) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(key);
            md.update(iv);
            md.update(ByteBuffer.allocate(4).putInt(counter).array());
            return md.digest();
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 unavailable", ex);
        }
    }
}
