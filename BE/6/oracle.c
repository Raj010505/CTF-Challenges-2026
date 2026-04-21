#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// The memory layout: security_clearance sits exactly 4 bytes before diagnostic_nodes
struct Subsystem {
    int security_clearance;
    int diagnostic_nodes[10];
};

void access_mainframe() {
    // Encrypted Flag: CH4KR4X2{1nt3g3r_und3rfl0w_pwn}
    // XORed with 0x42
    unsigned char cipher[] = { 
        0x3, 0xa, 0x76, 0xf, 0x10, 0x76, 0x1a, 0x70, 
        0x39, 0x33, 0x2c, 0x31, 0x71, 0x25, 0x3, 0x2d, 
        0x11, 0x26, 0x30, 0x24, 0x2a, 0x31, 0x3, 0x2d, 
        0x11, 0x32, 0x35, 0x3c, 0x2c, 0x3d, 0x3b 
    };
    
    printf("\n[+] CLEARANCE ACCEPTED. DECRYPTING MAINFRAME...\n");
    printf("FLAG: ");
    for(int i = 0; i < 31; i++) {
        printf("%c", cipher[i] ^ 0x42);
    }
    printf("\n");
    exit(0);
}

void initialize_sequence() {
    struct Subsystem *sys = (struct Subsystem *)malloc(sizeof(struct Subsystem));
    if (!sys) exit(1);
    
    sys->security_clearance = 0;
    
    for(int i=0; i<10; i++) {
        sys->diagnostic_nodes[i] = i * 2;
    }

    printf("Enter target node index to update (0-9): ");
    char input[32];
    if (fgets(input, 32, stdin) == NULL) return;
    int target = atoi(input);

    // VULNERABILITY: Missing lower bound check. 
    // Target is a signed integer, so negative numbers pass this check!
    if (target > 9) {
        printf("[-] Error: Node index out of valid boundaries.\n");
        free(sys);
        exit(1);
    }

    printf("Enter new calibration value: ");
    if (fgets(input, 32, stdin) == NULL) return;
    int val = atoi(input);

    // Write operation: A negative target walks backward into security_clearance
    sys->diagnostic_nodes[target] = val;

    printf("[*] Node updated. Verifying system state...\n");

    // Check if the user successfully overwrote the clearance value
    // Fun fact: 0x2152414a is the hexadecimal representation of the string "!RAJ"
    if (sys->security_clearance == 0x2152414a) { 
        access_mainframe();
    } else {
        printf("[-] Security Clearance: 0x%08x. Access Denied.\n", sys->security_clearance);
    }

    free(sys);
}

int main() {
    // Disable buffering for consistent CTF behavior
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);
    
    printf("=== SECTOR ORACLE CALIBRATION TOOL ===\n");
    initialize_sequence();
    
    return 0;
}