#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>
#include <stdint.h>
#include <time.h>

struct internet {
    int priority;
    char *name;
    uint64_t cookie;
    void (*callback)();
};

void winner() {
    FILE *fp;
    char flag[256];

    fp = fopen("bin/flag.txt", "r");
    if (fp == NULL) {
        printf("Error: Could not locate flag.txt on the server.\n");
        exit(1);
    }

    if (fgets(flag, sizeof(flag), fp) != NULL) {
        printf("CRITICAL HIT! FLAG: %s\n", flag);
    }

    fclose(fp);
}

void loser() {
    printf("No winners this time, try again!\n");
}

int main(int argc, char **argv) {
    if (argc != 3) {
        printf("Usage: ./vuln <name1> <name2>\n");
        return 1;
    }

    srand((unsigned)time(NULL));
    uint64_t security_cookie = rand() ^ (uint64_t)&loser;

    printf("DEBUG INFO | Winner Addr: %p | System Cookie: 0x%lx\n", &winner, security_cookie);

    struct internet *i1, *i2;

    i1 = malloc(sizeof(struct internet));
    i1->priority = 1;
    i1->name = malloc(8);
    i1->cookie = security_cookie;
    i1->callback = loser;

    i2 = malloc(sizeof(struct internet));
    i2->priority = 2;
    i2->name = malloc(8);
    i2->cookie = security_cookie;
    i2->callback = loser;

    strcpy(i1->name, argv[1]);
    strcpy(i2->name, argv[2]);

    if (i2->cookie != security_cookie) {
        printf("Heap corruption detected! Security Cookie mismatch.\n");
        exit(1);
    }

    if (i1->callback) {
        i1->callback();
    }
    if (i2->callback) {
        i2->callback();
    }

    return 0;
}
