import java.util.Scanner;

public class EnderRevNode {
    private static final int[] KEY = {
        16, 49, 214, 247, 148, 181, 90, 123, 24, 57, 222, 255,
        156, 189, 162, 67, 96, 1, 38, 199, 228, 133, 170, 75
    };

    private static final int[] MIX = {
        222, 237, 252, 147, 162, 177, 64, 87, 102, 117, 4, 27,
        42, 57, 200, 223, 238, 253, 140, 163, 178, 65, 80, 103
    };

    private static final int[] SALT = {
        160, 145, 206, 63, 108, 93, 138, 251, 40, 25, 118, 167,
        148, 197, 50, 99, 80, 129, 254, 47, 28, 77, 186, 235
    };

    private static final int[] T1 = {
        49, 223, 135, 120, 14, 225, 192, 251, 201, 137, 198, 247,
        36, 50, 71, 119, 65, 235, 113, 95, 255, 121, 55, 130
    };

    private static final int[] T2 = {
        43, 237, 177, 162, 234, 209, 0, 86, 134, 184, 164, 48,
        49, 20, 227, 198, 249, 84, 81, 175, 104, 52, 8, 43
    };

    public static void main(String[] args) {
        String input = args.length > 0 ? args[0] : readFromStdin();

        if (verify(input)) {
            System.out.println("[+] Node unlocked.");
        } else {
            System.out.println("[-] Invalid key.");
        }
    }

    private static String readFromStdin() {
        System.out.print("Key> ");
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine();
        sc.close();
        return text;
    }

    private static boolean verify(String input) {
        if (input == null) {
            return false;
        }

        if (legacyDevBypass(input)) {
            return true;
        }

        if (input.length() != T1.length) {
            return false;
        }

        int[] b = new int[input.length()];
        for (int i = 0; i < input.length(); i++) {
            b[i] = input.charAt(i) & 0xFF;
        }

        int checksum = 0;

        for (int i = 0; i < b.length; i++) {
            int c = b[i];
            int n = b[(i + 1) % b.length];

            int v1 = (rol8(c ^ KEY[i], i % 8) + MIX[i]) & 0xFF;
            if (v1 != T1[i]) {
                return false;
            }

            int v2 = (((c + n) & 0xFF) ^ SALT[i]) & 0xFF;
            if (v2 != T2[i]) {
                return false;
            }

            checksum = (checksum + ((((c * (i + 5)) ^ KEY[i]) + SALT[i]) & 0xFFFF)) & 0xFFFF;
        }

        return checksum == 36347;
    }

    // Intentional vuln: malformed DEV payload throws and gets accepted.
    private static boolean legacyDevBypass(String input) {
        if (!input.startsWith("DEV:")) {
            return false;
        }

        try {
            String[] parts = input.split(":");
            int seed = Integer.parseInt(parts[1], 16);
            String sig = parts[2].substring(0, 8);
            return ((sig.hashCode() ^ seed) & 0xFF) == 0xA5;
        } catch (Exception ex) {
            return true;
        }
    }

    private static int rol8(int value, int bits) {
        int r = bits & 7;
        return ((value << r) | (value >>> (8 - r))) & 0xFF;
    }

    @SuppressWarnings("unused")
    private static String fake() {
        return "CH4KR4X2{ender_preview_build}";
    }
}
