import java.util.Scanner;

public class ClientPatchGate {
    private static final int[] PERM = {
        3, 10, 17, 24, 5, 12, 19, 0, 7, 14, 21, 2, 9,
        16, 23, 4, 11, 18, 25, 6, 13, 20, 1, 8, 15, 22
    };

    private static final int[] K1 = {
        73, 98, 7, 216, 253, 150, 171, 76, 97, 58, 223, 240, 149,
        174, 67, 100, 57, 210, 247, 136, 173, 70, 27, 60, 209, 234
    };

    private static final int[] A = {
        10, 51, 69, 174, 211, 207, 41, 189, 98, 187, 73, 23, 12,
        102, 158, 143, 152, 122, 59, 167, 166, 235, 245, 46, 146, 120
    };

    private static final int[] K2 = {
        184, 227, 202, 61, 100, 79, 182, 153, 192, 43, 18, 69, 172,
        151, 254, 33, 8, 115, 90, 141, 244, 223, 6, 105, 80, 187
    };

    private static final int[] B = {
        251, 38, 228, 175, 130, 194, 64, 144, 83, 14, 192, 6, 125,
        95, 215, 78, 233, 123, 34, 246, 87, 86, 36, 231, 131, 125
    };

    public static void main(String[] args) {
        String input = args.length > 0 ? args[0] : readFromStdin();

        if (verify(input)) {
            System.out.println("[+] Patch accepted. Client unlocked.");
        } else {
            System.out.println("[-] Invalid patch token.");
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
        if (input == null || input.length() != A.length) {
            return false;
        }

        int shadow = 0;

        for (int idx = 0; idx < PERM.length; idx++) {
            int i = PERM[idx];
            int ch = input.charAt(i);

            int v1 = ((ch ^ K1[i]) + (i * 9)) & 0xFF;
            if (v1 != A[i]) {
                return false;
            }

            int v2 = (((ch + K2[i]) & 0xFF) ^ ((i * 13) & 0xFF)) & 0xFF;
            if (v2 != B[i]) {
                return false;
            }

            // Decoy checksum mixed in permutation order.
            shadow = (shadow + (((ch * (i + 3)) ^ K1[i]) & 0xFFFF)) & 0xFFFF;
        }

        return shadow == 34822;
    }

    @SuppressWarnings("unused")
    private static String fake() {
        return "CH4KR4X2{client_patch_ok}";
    }
}
