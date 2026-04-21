#include <stdio.h>
#include <string.h>

// DECOY FUNCTION: The compiler will keep this, and decompilers will see it.
// If a player reverses this array, they get the dummy flag: CX0[R0X2{P0D5oz3r0d0yoxwn}
void legacy_auth_check(char *input) {
    int dummy_target[] = {
        105, 114, 26, 113, 120, 26, 114, 24, 81, 122, 26, 110, 
        31, 69, 80, 25, 88, 26, 78, 26, 83, 69, 82, 93, 68, 87
    };
    int match = 1;
    for(int i = 0; i < 26; i++) {
        if ((input[i] ^ 42) != dummy_target[i]) {
            match = 0;
        }
    }
    // We never actually do anything with 'match', but it wastes the player's time
}

int main() {
    char input[100];
    
    // THE REAL CHECK: The perfect XOR array for CH4KR4X2{P0D5_z3r0d4y_pwn}
    int target[] = {
        105, 98, 30, 97, 120, 30, 114, 24, 81, 122, 26, 110, 
        31, 69, 80, 25, 88, 26, 78, 30, 83, 69, 82, 93, 68, 87
    };
    int flag_len = 26;

    printf("--- Pod System v2.0 Authentication ---\n");
    printf("Enter authorization key: ");
    
    if (scanf("%99s", input) != 1) {
        return 1;
    }

    if (strlen(input) != flag_len) {
        printf("Access Denied: Invalid key length.\n");
        return 1;
    }

    // This is the active check using the perfect target array
    for (int i = 0; i < flag_len; i++) {
        if ((input[i] ^ 42) != target[i]) {
            printf("Access Denied: Invalid matrix alignment.\n");
            return 1;
        }
    }

    printf("Access Granted! Welcome back, Admin.\n");
    return 0;
}