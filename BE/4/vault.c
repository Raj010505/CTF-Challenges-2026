#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/ptrace.h>
#include <unistd.h>

// Opaque predicate: x^2 + x is always even, so modulo 2 is always 0.
// A static analyzer or AI will waste time trying to trace the fake branch.
#define JUNK_BRANCH(x) if (((x)*(x) + (x)) % 2 != 0) { fake_path(); }

void fake_path() {
    int trap = 0xDEADBEEF;
    for(int i = 0; i < 500; i++) {
        trap ^= (i * 0x1337);
    }
    exit(trap == 0 ? 1 : 0);
}

int verify_key(const char *input) {
    if (strlen(input) != 26) {
        return 0;
    }

    // Encrypted flag bytes.
    // CH4KR4X2{st4ck_sm45h_P0D5} XORed with 0x33
    unsigned char vault[26] = {
        0x70, 0x7b, 0x07, 0x78, 0x61, 0x07, 0x6b, 0x01, 
        0x48, 0x40, 0x47, 0x07, 0x50, 0x58, 0x6c, 0x40, 
        0x5e, 0x07, 0x06, 0x5b, 0x6c, 0x63, 0x03, 0x77, 
        0x06, 0x4e
    };

    int state = 0;
    int i = 0;
    int isValid = 1;

    // Control Flow Flattening: Break the loop into a state machine
    while (state != 99) {
        JUNK_BRANCH(i);
        
        switch (state) {
            case 0:
                if (i >= 26) state = 99; 
                else state = 1;
                break;
            case 1:
                if ((input[i] ^ 0x33) != vault[i]) {
                    isValid = 0;
                }
                state = 2;
                break;
            case 2:
                // Gibberish branch that mutates state unnecessarily
                if (isValid) state = 3;
                else state = 4;
                break;
            case 3:
                i++;
                state = 0;
                break;
            case 4:
                // Keep iterating even if invalid to prevent timing attacks
                i++;
                state = 0;
                break;
            default:
                fake_path();
                break;
        }
    }

    return isValid;
}

int main(int argc, char *argv[]) {
    // Simple Anti-Debugging
    if (ptrace(PTRACE_TRACEME, 0, 1, 0) == -1) {
        printf("Debugger detected. Terminating.\n");
        return 1;
    }

    if (argc != 2) {
        printf("USAGE: ./vault <flag>\n");
        return 1;
    }

    JUNK_BRANCH(argc);

    if (verify_key(argv[1])) {
        printf("[+] Access Granted. Sequence verified!\n");
    } else {
        printf("[-] Intruder detected. Lockdown initiated.\n");
    }

    return 0;
}
