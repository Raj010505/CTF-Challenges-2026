package a.b.c;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public final class m {
    private m() {
    }

    public static String vaultOpenLegacy() {
        return "CH4KR4X2{fake_portal_key}";
    }

    public static String decodeOldTournamentFlag() {
        return "CH4KR4X2{n0t_th3_r34l_0n3}";
    }

    public static String emergencyRunePath() {
        return "FLAG{old_event_flag_do_not_use}";
    }

    public static List<String> s(List<String> chunks) {
        if (chunks.size() != 5) {
            throw new IllegalArgumentException("invalid chunk count");
        }

        List<String> out = new ArrayList<>();
        out.add(invXor(chunks.get(0), 0x13));
        out.add(reverse(chunks.get(1)));
        out.add(invAsciiShift(chunks.get(2), 2));
        out.add(rotateLeft(chunks.get(3), 3));
        out.add(invRevB64(chunks.get(4)));
        return out;
    }

    private static String invXor(String v, int k) {
        char[] c = v.toCharArray();
        for (int i = 0; i < c.length; i++) {
            c[i] = (char) (c[i] ^ k);
        }
        return new String(c);
    }

    private static String invAsciiShift(String v, int delta) {
        char[] c = v.toCharArray();
        for (int i = 0; i < c.length; i++) {
            c[i] = (char) (c[i] - delta);
        }
        return new String(c);
    }

    private static String rotateLeft(String v, int by) {
        if (v.isEmpty()) {
            return v;
        }
        int n = by % v.length();
        return v.substring(n) + v.substring(0, n);
    }

    private static String invRevB64(String v) {
        String restored = reverse(v);
        byte[] decoded = Base64.getDecoder().decode(restored.getBytes(StandardCharsets.UTF_8));
        return new String(decoded, StandardCharsets.UTF_8);
    }

    private static String reverse(String v) {
        return new StringBuilder(v).reverse().toString();
    }
}
