import java.util.Scanner;

public class Stev3PatchLab {
    private static final int[] T = {
        98, 208, 93, 155, 24, 108, 55, 10, 214, 62,
        247, 151, 148, 223, 36, 99, 158, 146, 180, 126,
        255, 16, 29, 43, 205
    };

    private static final int[] M = {
        250, 201, 216, 55, 6, 21, 100, 115, 66, 81,
        160, 191, 142, 157, 236, 251, 202, 217, 40, 7,
        22, 101, 116, 67, 82
    };

    private static final int[] C = {
        139, 247, 136, 56, 96, 19, 74, 37, 125, 22,
        230, 250, 156, 234, 135, 170, 140, 217, 95, 108,
        116, 35, 84, 50, 27
    };

    public static void main(String[] args) {
        String input = args.length > 0 ? args[0] : readFromStdin();

        if (verify(input)) {
            System.out.println("[+] Diagnostic mode unlocked.");
        } else {
            System.out.println("[-] Bad token.");
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
        if (input == null || input.length() != T.length) {
            return false;
        }

        int[] b = new int[input.length()];
        for (int i = 0; i < input.length(); i++) {
            b[i] = input.charAt(i) & 0xFF;
        }

        int sentinel = 0;

        for (int i = 0; i < b.length; i++) {
            int x = (b[i] + ((i * i + 31) & 0xFF)) & 0xFF;
            x = rol8(x, i % 5);
            if (x != T[i]) {
                return false;
            }

            int j = (i * 5 + 7) % b.length;
            int y = (b[i] ^ b[j] ^ M[i]) & 0xFF;
            if (y != C[i]) {
                return false;
            }

            sentinel = (sentinel + (((b[i] * (i + 11)) ^ ((i * 9 + 3) & 0xFF)) & 0xFFFF)) & 0xFFFF;
        }

        if ((sentinel ^ 0x55AA) == 0x1234) {
            return false;
        }

        return sentinel == 46390;
    }

    private static int rol8(int value, int bits) {
        int r = bits & 7;
        return ((value << r) | (value >>> (8 - r))) & 0xFF;
    }

    @SuppressWarnings("unused")
    private static String fakeHint() {
        return "CH4KR4X2{steve_patch_alpha}";
    }
}
