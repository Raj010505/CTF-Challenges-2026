#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// Global State Requirements
int eye_1 = 0;
int eye_2 = 0;
int eye_3 = 0;

// WEAPONIZED GADGETS: 
// These assembly instructions allow attackers to pop values off the stack 
// into registers, which is required for 64-bit function arguments.
void chorus_fruit_routing() {
    __asm__(
        "pop %rdi\n\t"
        "ret\n\t"
        "pop %rsi\n\t"
        "ret\n\t"
    );
}

void align_eye_1(long magic) {
    if (magic == 0xDEADBEEF) {
        eye_1 = 1;
    }
}

void align_eye_2(long magic) {
    if (magic == 0xCAFEBABE) {
        eye_2 = 1;
    }
}

void align_eye_3(long magic) {
    if (magic == 0x1337C0DE) {
        eye_3 = 1;
    }
}

void ignite_portal() {
    // Encrypted Flag: CH4KR4X2{3nd3r_r0p_ch41n_P0D5}
    // XORed with 0x11
    unsigned char cipher[] = {
        0x52, 0x59, 0x25, 0x5a, 0x43, 0x25, 0x49, 0x23, 
        0x6a, 0x22, 0x7f, 0x75, 0x22, 0x63, 0x4e, 0x63, 
        0x21, 0x61, 0x4e, 0x72, 0x79, 0x25, 0x20, 0x7f, 
        0x4e, 0x41, 0x21, 0x55, 0x24, 0x6c
    };

    if (eye_1 && eye_2 && eye_3) {
        printf("\n[+] DIMENSIONAL GATEWAY OPENED.\nFLAG: ");
        for(int i = 0; i < 30; i++) {
            printf("%c", cipher[i] ^ 0x11);
        }
        printf("\n");
        exit(0);
    } else {
        printf("\n[-] The frame is incomplete. The void rejects you.\n");
        exit(1);
    }
}

void read_coordinates() {
    // Grouping into a struct ensures predictable memory layout
    struct {
        char buffer[32];
        long sentinel;
    } frame;

    // The Custom Local Canary ("Bedrock Anchor")
    frame.sentinel = 0x0B51D1A1; // "OBSIDIAN" 

    printf("Enter Gateway Coordinates: ");
    
    // VULNERABILITY: read() accepts 256 bytes into a 32 byte buffer.
    read(0, frame.buffer, 256);

    // AI will tell players to just overwrite RIP, forgetting this check exists.
    if (frame.sentinel != 0x0B51D1A1) {
        printf("\n[-] Bedrock Anchor corrupted! Smashing detected.\n");
        exit(1);
    }
}

int main() {
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);

    printf("=== ENDER GATEWAY INITIALIZED ===\n");
    read_coordinates();
    
    printf("[*] Coordinates parsed. Shutting down.\n");
    return 0;
}