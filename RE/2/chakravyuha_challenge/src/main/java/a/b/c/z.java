package a.b.c;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public final class z {
    private z() {
    }

    public static int g() {
        int x = 0x13579BDF;
        x ^= (0x02468ACE << 1);
        x = Integer.rotateLeft(x, 5);
        x ^= 0x0BADF00D;
        return x;
    }

    public static String p() {
        String s = "EnderPearl";
        int b0 = (s.charAt(0) + s.charAt(5)) & 0xFF;
        int b1 = (s.charAt(2) ^ s.charAt(7)) & 0xFF;
        return String.format("%02x%02x", b0, b1);
    }

    public static byte[] u(int g1, String g2, String runes) {
        String material = String.format("%08x|%s|%s", g1, g2, runes.substring(0, 16));
        return digest(material).substring(0, 16).getBytes(StandardCharsets.UTF_8);
    }

    public static byte[] v(int g1, String g2, String runes) {
        String rg2 = new StringBuilder(g2).reverse().toString();
        String material = String.format("%s:%08x:%s", rg2, Integer.rotateLeft(g1, 7), runes.substring(16, 32));
        return digest(material).substring(0, 16).getBytes(StandardCharsets.UTF_8);
    }

    public static String w(String assembled, int[] perm) {
        if (assembled.length() != perm.length) {
            throw new IllegalArgumentException("length mismatch");
        }

        char[] out = new char[perm.length];
        for (int i = 0; i < perm.length; i++) {
            out[i] = assembled.charAt(perm[i]);
        }
        return new String(out);
    }

    public static boolean x(String flag, String expectedSha256) {
        return digest(flag).equalsIgnoreCase(expectedSha256);
    }

    public static String y(byte[] b) {
        return new String(b, StandardCharsets.UTF_8);
    }

    public static byte[] l(String resourcePath) throws IOException {
        try (InputStream in = z.class.getResourceAsStream(resourcePath)) {
            if (in == null) {
                throw new IOException("missing resource: " + resourcePath);
            }
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[4096];
            int n;
            while ((n = in.read(buf)) != -1) {
                out.write(buf, 0, n);
            }
            return out.toByteArray();
        }
    }

    public static String runesFromTable(byte[] table) {
        String content = new String(table, StandardCharsets.UTF_8);
        for (String line : content.split("\\R")) {
            if (line.startsWith("runes=")) {
                return line.substring("runes=".length()).trim();
            }
        }
        throw new IllegalStateException("runes line missing");
    }

    private static String digest(String value) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] d = md.digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder(d.length * 2);
            for (byte b : d) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 unavailable", ex);
        }
    }
}
