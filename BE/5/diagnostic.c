#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Global target variable. Because we compile without PIE, this sits at a static address.
int system_checksum = 0;

void unlock_protocol() {
    // Encrypted Flag: CH4KR4X2{P0D5_b1n4ry_pwn}
    // XORed with 0x55 to prevent strings/grep detection
    unsigned char cipher[] = {
        0x16, 0x1d, 0x61, 0x1e, 0x07, 0x61, 0x0d, 0x67, 
        0x2e, 0x05, 0x65, 0x11, 0x60, 0x0a, 0x37, 0x64, 
        0x3b, 0x61, 0x27, 0x2c, 0x0a, 0x25, 0x22, 0x3b, 
        0x28
    };
    
    printf("\n[!] CHECKSUM VALIDATED. OVERRIDE ACCEPTED...\n");
    printf("FLAG: ");
    for(int i = 0; i < 25; i++) {
        printf("%c", cipher[i] ^ 0x55);
    }
    printf("\n");
    exit(0);
}

void handle_input() {
    // The twist: The buffer is allocated on the Heap, not the Stack.
    char *diagnostic_buffer = (char *)malloc(512);
    if (!diagnostic_buffer) exit(1);

    printf("Enter system diagnostic sequence: ");
    if (fgets(diagnostic_buffer, 512, stdin) == NULL) {
        free(diagnostic_buffer);
        return;
    }

    // VULNERABILITY: Unsafe printf
    printf("Echoing diagnostic sequence:\n");
    printf(diagnostic_buffer);

    // The validation check
    if (system_checksum == 0x1337BEEF) {
        unlock_protocol();
    } else if (system_checksum != 0) {
        printf("\n[-] Invalid checksum state detected: 0x%08x\n", system_checksum);
    }

    free(diagnostic_buffer);
}

int main() {
    // Disable buffering for consistent CTF behavior
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);

    printf("=== DIAGNOSTIC CONSOLE v3.0 ===\n");
    printf("System Anchor: %p\n", &system_checksum);
    
    handle_input();
    
    printf("\n[+] Process terminated.\n");
    return 0;
}
