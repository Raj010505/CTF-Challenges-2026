#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// By putting these in a struct, we guarantee the compiler places 
// the admin flag immediately after the player name in memory.
struct PlayerContext {
    char player_name[32];
    int is_admin;
};

void drop_seed() {
    // Encrypted Flag: CH4KR4X2{m1n3_b1n_h4ck_P0D5}
    // XORed with 0x0A
    unsigned char enc[] = {
        0x49, 0x42, 0x3e, 0x41, 0x58, 0x3e, 0x52, 0x38, 
        0x71, 0x67, 0x3b, 0x64, 0x39, 0x55, 0x68, 0x3b, 
        0x64, 0x55, 0x62, 0x3e, 0x69, 0x61, 0x55, 0x5a, 
        0x3a, 0x4e, 0x3f, 0x77
    };
    
    printf("\n[+] Game Mode updated to CREATIVE. OP Status Granted.\n");
    printf("Server Seed (Flag): ");
    for(int i = 0; i < 28; i++) {
        printf("%c", enc[i] ^ 0x0A);
    }
    printf("\n");
    exit(0);
}

void login() {
    struct PlayerContext ctx;
    ctx.is_admin = 0; // Default state: Not an admin

    printf("Enter Player IGN to authenticate: ");
    
    // VULNERABILITY: scanf("%s") reads input without checking bounds.
    // It will overflow ctx.player_name right into ctx.is_admin.
    scanf("%s", ctx.player_name);

    // A fake admin check to distract beginners
    if (strcmp(ctx.player_name, "HeroBrine_Real") == 0) {
        ctx.is_admin = 1;
    }

    if (ctx.is_admin != 0) {
        drop_seed();
    } else {
        printf("[-] Welcome %s. You are in SURVIVAL mode. No OP rights.\n", ctx.player_name);
    }
}

int main() {
    // Disable buffering for consistent CTF behavior
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);
    
    printf("=== BLOCKSERVER LOCAL ADMIN CONSOLE ===\n");
    login();
    
    return 0;
}