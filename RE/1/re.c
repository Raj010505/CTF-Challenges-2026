#include <stdio.h>
#include <string.h>
#include <time.h>

int main(int argc, char *argv[]) {
    // Stage 1: Rolling XOR + Secondary XOR Encryption
    // "CH4KR4X2{P0D5_4rm0r_d3c0mp}" encoded dynamically
    unsigned char vault[] = {
        0x12, 0x1e, 0x77, 0x1f, 0x05, 0x7a, 0x03, 0x68, 0x40, 0x0a, 
        0x6b, 0x1a, 0x6a, 0x03, 0x73, 0x12, 0x2e, 0x74, 0x0f, 0x19, 
        0x03, 0x73, 0x1e, 0x7a, 0x36, 0x06
    };
    int len = 26;
    
    // Stage 2: Mathematical Dispatcher Initialization
    int state = 42; 
    int i = 0;
    int success = 1;
    
    // Stage 3: Anti-Analysis setup
    clock_t start_time = clock();

    // The Flattened Loop
    while (state != 0) {
        switch (state) {
            case 42: // Initial Length Check
                if (argc != 2 || strlen(argv[1]) != len) {
                    success = 0;
                    state = 0; 
                } else {
                    // Next state calculated dynamically: (42 * 17) % 255 = 204
                    state = (state * 17) % 255; 
                }
                break;

            case 204: // Anti-Debugging Timing Check
                // If the player steps through this in a debugger, the clock ticks too long
                if ((clock() - start_time) > 100000) { 
                    state = 99; // Trap state
                } else {
                    // Next state: (204 * 17) % 255 = 153
                    state = (state * 17) % 255; 
                }
                break;

            case 153: // The Cryptography Loop
                if (i < len) {
                    // Rolling XOR: Key increases with index 'i', followed by fixed XOR with 0x13
                    if (((argv[1][i] ^ (0x42 + i)) ^ 0x13) != vault[i]) {
                        success = 0;
                        state = 0; 
                    } else {
                        // Next state: (153 * 17) % 255 = 51
                        state = (state * 17) % 255; 
                    }
                } else {
                    state = 102; // Moves to Success
                }
                break;

            case 51: // Loop Increment
                i++;
                state = 153; // Hard jump back to the Crypto loop
                break;

            case 102: // Success State
                if (success) printf("Access Granted! P0D5 Armor Bypassed.\n");
                state = 0;
                break;

            case 99: // Trap Execution
                printf("Debugger detected. Timing check failed.\n");
                success = 0;
                state = 0;
                break;
                
            default:
                state = 0;
                break;
        }
    }

    return success ? 0 : 1;
}