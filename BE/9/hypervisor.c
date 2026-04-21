#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void enter_nether() {
    // Encrypted Flag: CH4KR4X2{P0D5_r00t_sh3ll_n3th3r}
    // XORed with 0x77
    unsigned char cipher[] = {
        0x34, 0x3f, 0x43, 0x3c, 0x25, 0x43, 0x2f, 0x45, 
        0x0c, 0x27, 0x47, 0x33, 0x42, 0x28, 0x05, 0x47, 
        0x47, 0x03, 0x28, 0x04, 0x1f, 0x44, 0x1b, 0x1b, 
        0x28, 0x19, 0x44, 0x03, 0x1f, 0x44, 0x05, 0x0a
    };
    
    printf("\n[+] DIMENSIONAL TEAR DETECTED. ENTERING THE NETHER...\nFLAG: ");
    for(int i = 0; i < 32; i++) {
        printf("%c", cipher[i] ^ 0x77);
    }
    printf("\n");
    exit(0);
}

void safe_shutdown() {
    printf("[*] VM execution completed. Safe shutdown initiated.\n");
    exit(0);
}

// VM Architecture Definition
// #pragma pack ensures exact memory alignment without compiler padding
#pragma pack(push, 1)
struct VM_Core {
    unsigned char ram[128];
    unsigned int reg[4];
    void (*halt_callback)();
};
#pragma pack(pop)

void execute_bytecode(unsigned char *code, int len) {
    struct VM_Core vm;
    memset(&vm, 0, sizeof(struct VM_Core));
    vm.halt_callback = safe_shutdown;

    int pc = 0;
    while (pc < len) {
        unsigned char op = code[pc++];
        
        if (op == 0x01) { 
            // OpCode 0x01: LOAD_IMM reg_id, val32
            // Format: 01 [reg] [4-byte value]
            if (pc + 4 >= len) break;
            unsigned char r = code[pc++];
            unsigned int val = *(unsigned int*)(&code[pc]);
            pc += 4;
            if (r < 4) vm.reg[r] = val;
            
        } else if (op == 0x02) { 
            // OpCode 0x02: STORE ram_offset, reg_id
            // Format: 02 [offset] [reg]
            if (pc + 1 >= len) break;
            unsigned char offset = code[pc++];
            unsigned char r = code[pc++];
            
            if (r < 4) {
                // VULNERABILITY: offset is an unsigned char (0-255).
                // But ram is only 128 bytes long. 
                // A player can write past ram and overwrite the registers or the halt_callback!
                *(unsigned int*)(&vm.ram[offset]) = vm.reg[r];
            }
        } else if (op == 0xFF) { 
            // OpCode 0xFF: HALT
            break;
        } else {
            // Invalid opcode, halt.
            break;
        }
    }
    
    // Trigger the callback function (vulnerable to hijack)
    vm.halt_callback();
}

int main() {
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);

    printf("=== OBSIDIAN HYPERVISOR v1.0 ===\n");
    printf("[DEBUG] Nether Portal Anchor Function at: %p\n", enter_nether);
    
    printf("Enter bytecode (Hex format, e.g. '0100AABB...'):\n> ");
    char hex_input[512];
    if (!fgets(hex_input, sizeof(hex_input), stdin)) return 1;
    
    unsigned char bytecode[256];
    int len = 0;
    char *pos = hex_input;
    
    // Convert hex string to raw bytes
    while (*pos && *pos != '\n' && len < 256) {
        if (sscanf(pos, "%2hhx", &bytecode[len]) == 1) {
            len++;
            pos += 2;
        } else {
            break;
        }
    }

    printf("[*] Executing %d bytes of custom bytecode...\n", len);
    execute_bytecode(bytecode, len);

    return 0;
}