import java.util.Scanner;

public class Pod5Vault {
    private static final int[] SPICE = {
        41, 114, 187, 4, 77, 150, 223, 40, 113, 186,
        3, 76, 149, 222, 39, 112, 185, 2, 75, 148,
        221, 38, 111, 184, 1
    };

    private static final int[] ENC = {
        106, 49, 153, 110, 51, 149, 197, 87, 82, 137,
        93, 113, 164, 142, 87, 97, 251, 102, 105, 246,
        226, 113, 112, 181, 116
    };

    public static void main(String[] args) {
        String input = args.length > 0 ? args[0] : readFromStdin();

        if (verify(input)) {
            System.out.println("[+] Access granted.");
        } else {
            System.out.println("[-] Access denied.");
        }
    }

    private static String readFromStdin() {
        System.out.print("Flag> ");
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine();
        sc.close();
        return text;
    }

    private static boolean verify(String input) {
        if (input == null || input.length() != ENC.length) {
            return false;
        }

        char[] expected = recoverExpected();

        // Decoy state machine to distract static analysis.
        int state = 0x5A17;
        for (int i = 0; i < input.length(); i++) {
            int mixed = (input.charAt(i) + (i * 17)) ^ (expected[i] + i);
            state = Integer.rotateLeft(state ^ mixed, 3) + 0x1337;
        }

        if ((state & 0x7) == 9) {
            return false;
        }

        for (int i = 0; i < input.length(); i++) {
            int key = rollingKey(i);
            if ((input.charAt(i) ^ key) != (expected[i] ^ key)) {
                return false;
            }
        }

        return true;
    }

    private static char[] recoverExpected() {
        char[] out = new char[ENC.length];

        for (int i = 0; i < ENC.length; i++) {
            int scramble = (i * 11) & 0x7F;
            out[i] = (char) (ENC[i] ^ SPICE[i] ^ scramble);
        }

        return out;
    }

    private static int rollingKey(int idx) {
        int k = ((idx * 29) + 7) & 0xFF;
        k ^= ((idx << 2) & 0x3F);
        return k;
    }

    @SuppressWarnings("unused")
    private static String fakeFlag() {
        return "CH4KR4X2{jar_strings_only}";
    }
}
