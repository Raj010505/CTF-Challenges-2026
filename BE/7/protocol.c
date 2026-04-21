#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Struct size is 32 bytes (4 bytes for int + 28 bytes for char array)
struct Session {
    int privilege_level; 
    char identifier[28];
};

struct Session *active_session = NULL;

void grant_access() {
    // Encrypted Flag: CH4KR4X2{P0D5_expl01t_k1t}
    // XORed with 0x66
    unsigned char vault[] = {
        0x25, 0x2e, 0x52, 0x2d, 0x34, 0x52, 0x3e, 0x54, 
        0x1d, 0x36, 0x56, 0x22, 0x53, 0x39, 0x03, 0x1e, 
        0x16, 0x0a, 0x56, 0x57, 0x12, 0x39, 0x0d, 0x57, 
        0x12, 0x1b
    };
    
    printf("\n[+] ROOT PRIVILEGES GRANTED. OVERRIDE SUCCESSFUL.\n");
    printf("FLAG: ");
    for(int i = 0; i < 26; i++) {
        printf("%c", vault[i] ^ 0x66);
    }
    printf("\n");
    exit(0);
}

void menu() {
    printf("\n--- SESSION MANAGEMENT DAEMON ---\n");
    printf("1. Initialize Guest Session\n");
    printf("2. Revoke Current Session\n");
    printf("3. Submit Diagnostic Note\n");
    printf("4. Authenticate Session\n");
    printf("5. Exit\n");
    printf("Selection: ");
}

int main() {
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);

    int choice;
    char buffer[32];

    while (1) {
        menu();
        if (fgets(buffer, sizeof(buffer), stdin) == NULL) break;
        choice = atoi(buffer);

        if (choice == 1) {
            if (active_session != NULL) {
                printf("[-] Session already exists.\n");
                continue;
            }
            active_session = (struct Session *)malloc(sizeof(struct Session));
            active_session->privilege_level = 1; // 1 = Guest
            printf("Enter guest identifier: ");
            fgets(active_session->identifier, 28, stdin);
            printf("[+] Guest session allocated at %p\n", active_session);

        } else if (choice == 2) {
            if (active_session == NULL) {
                printf("[-] No active session to revoke.\n");
                continue;
            }
            free(active_session);
            // VULNERABILITY: Use-After-Free
            // The pointer active_session is NEVER set to NULL after being freed.
            printf("[+] Session revoked and memory freed.\n");

        } else if (choice == 3) {
            // Allocate a chunk of the EXACT SAME SIZE as the Session struct (32 bytes)
            char *note = (char *)malloc(32);
            printf("Enter diagnostic note: ");
            fgets(note, 32, stdin);
            printf("[+] Note saved.\n");

        } else if (choice == 4) {
            if (active_session == NULL) {
                printf("[-] No active session. Please initialize first.\n");
                continue;
            }
            
            printf("[*] Authenticating session for: %s", active_session->identifier);
            if (active_session->privilege_level == 0x1337) {
                grant_access();
            } else {
                printf("[-] Access Denied. Privilege level %d is insufficient.\n", active_session->privilege_level);
            }

        } else if (choice == 5) {
            printf("Exiting...\n");
            break;
        } else {
            printf("[-] Invalid selection.\n");
        }
    }
    return 0;
}