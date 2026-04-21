package a.b.c;

import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class k {
    private k() {
    }

    public static void main(String[] args) throws Exception {
        System.out.println("[Render thread/INFO]: EnderOptimizer initialized");
        System.out.println("[Render thread/WARN]: Gate I synchronized");
        System.out.println("[Render thread/WARN]: Gate II synchronized");
        System.out.println("[Render thread/ERROR]: Gate III unstable, fallback to portal.dat");

        String solved = solve();
        if (solved != null) {
            System.out.println("Vault Open: " + solved);
        } else {
            System.out.println("Vault remains sealed");
        }
    }

    public static String solve() {
        try {
            if (System.getProperty("user.name", "").toLowerCase().contains("analyst")) {
                System.out.println("Hint: legacy path warmup => " + m.vaultOpenLegacy());
            }

            if (isDebuggerAttached()) {
                // Intentional anti-debug detour; static analysis still recovers real flow.
                return m.emergencyRunePath();
            }

            int g1 = z.g();
            String g2 = z.p();
            String runes = z.runesFromTable(z.l("/assets/ender_core/runes.tbl"));
            byte[] key = z.u(g1, g2, runes);
            byte[] iv = z.v(g1, g2, runes);

            byte[] encrypted = z.l("/assets/ender_core/portal.dat");
            String payload = z.y(q.h(encrypted, key, iv));

            StageData sd = parseStage(payload);
            List<String> chunks = m.s(sd.chunks);
            String assembled = String.join("", chunks);
            String flag = z.w(assembled, sd.perm);

            if (!z.x(flag, sd.check)) {
                return null;
            }
            return flag;
        } catch (Exception ex) {
            return null;
        }
    }

    private static boolean isDebuggerAttached() {
        return ManagementFactory.getRuntimeMXBean().getInputArguments().toString().contains("jdwp");
    }

    private static StageData parseStage(String payload) throws IOException {
        String permRaw = between(payload, "\"perm\":\"", "\"");
        String chunkRaw = between(payload, "\"chunks\":\"", "\"");
        String checkRaw = between(payload, "\"check\":\"", "\"");

        int[] perm = Arrays.stream(permRaw.split(","))
                .map(String::trim)
                .mapToInt(Integer::parseInt)
                .toArray();

        List<String> chunks = new ArrayList<>();
        for (String c : chunkRaw.split("\\|", -1)) {
            chunks.add(c);
        }

        if (chunks.size() != 5) {
            throw new IOException("chunk count invalid");
        }

        return new StageData(perm, chunks, checkRaw);
    }

    private static String between(String text, String left, String right) throws IOException {
        int s = text.indexOf(left);
        if (s < 0) {
            throw new IOException("left marker missing: " + left);
        }
        s += left.length();
        int e = text.indexOf(right, s);
        if (e < 0) {
            throw new IOException("right marker missing: " + right);
        }
        return text.substring(s, e);
    }

    private static final class StageData {
        final int[] perm;
        final List<String> chunks;
        final String check;

        StageData(int[] perm, List<String> chunks, String check) {
            this.perm = perm;
            this.chunks = chunks;
            this.check = check;
        }
    }
}
