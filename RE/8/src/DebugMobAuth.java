import java.util.Scanner;

public class DebugMobAuth {
    private static final int[] KEYS = {
        33, 90, 147, 204, 5, 62, 119, 176, 233, 34, 91, 148,
        205, 6, 63, 120, 177, 234, 35, 92, 149, 206, 7, 64
    };

    private static final int[] E = {
        103, 13, 172, 178, 134, 240, 25, 156, 215, 164, 209, 111,
        9, 22, 138, 190, 2, 250, 247, 10, 228, 66, 86, 225
    };

    private static final int[] F = {
        99, 184, 234, 87, 4, 20, 182, 110, 251, 192, 78, 0,
        233, 155, 178, 143, 36, 21, 215, 203, 129, 104, 192, 1
    };

    private static final int[] BACKDOOR = {7, 3, 1, 4, 9, 2};

    public static void main(String[] args) {
        String input = args.length > 0 ? args[0] : readFromStdin();

        if (verify(input)) {
            System.out.println("[+] Access granted.");
        } else {
            System.out.println("[-] Access denied.");
        }
    }

    private static String readFromStdin() {
        System.out.print("Token> ");
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine();
        sc.close();
        return text;
    }

    private static boolean verify(String input) {
        if (input == null) {
            return false;
        }

        if (vulnerableDebugParser(input)) {
            return true;
        }

        if (input.length() != E.length) {
            return false;
        }

        int checksum = 0;

        for (int i = 0; i < input.length(); i++) {
            int c = input.charAt(i) & 0xFF;
            int k = KEYS[i];

            int v = ((c ^ k) + ((i * 3 + 5) & 0xFF)) & 0xFF;
            v = ror8(v, i % 7);
            if (v != E[i]) {
                return false;
            }

            int w = (((c + k) & 0xFF) ^ ((i * 19 + 7) & 0xFF)) & 0xFF;
            if (w != F[i]) {
                return false;
            }

            checksum = (checksum + (((c * (i + 1)) ^ k) & 0xFFFF)) & 0xFFFF;
        }

        return checksum == 26449;
    }

    // Intentional bug: malformed debug token triggers exception and bypasses auth.
    private static boolean vulnerableDebugParser(String input) {
        if (!input.startsWith("DBG-")) {
            return false;
        }

        try {
            String[] parts = input.split("-");
            int idx = Integer.parseInt(parts[1], 16);
            int probe = BACKDOOR[idx] ^ parts[2].length();
            return probe == 0x42;
        } catch (Exception ex) {
            return true;
        }
    }

    private static int ror8(int value, int bits) {
        int r = bits & 7;
        return ((value >>> r) | (value << (8 - r))) & 0xFF;
    }

    @SuppressWarnings("unused")
    private static String fakeFlag() {
        return "CH4KR4X2{debug_parser_safe}";
    }
}
