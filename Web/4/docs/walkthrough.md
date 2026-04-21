# Astral Locksmith - Baby-Step Solve Walkthrough

This walkthrough solves the challenge exactly as a player would.

## 1) Open the challenge

1. Run npm run dev.
2. Open http://localhost:3000.
3. You will see 5 stages and one final vault.

## 2) Solve Stage 1: The Acrostic Gate

1. Read each line of the clue.
2. Take the first letter of every line.
3. The letters are: M I R R O R.
4. Stage key is MIRROR.
5. Enter MIRROR and click Submit Stage Key.

## 3) Solve Stage 2: The Dial of Three

1. Clue text is SULVP.
2. Hint says Caesar dial with -3.
3. Shift each letter three steps backward:
4. S->P, U->R, L->I, V->S, P->M.
5. Stage key is PRISM.
6. Enter PRISM and submit.

## 4) Solve Stage 3: The Binary Sky

1. Convert each 8-bit block to ASCII:
2. 01001111 = O
3. 01010010 = R
4. 01000010 = B
5. 01001001 = I
6. 01010100 = T
7. Stage key is ORBIT.
8. Enter ORBIT and submit.

## 5) Solve Stage 4: The Coordinate Vault

1. Use the hint: x-y means x + y.
2. Compute each pair:
3. 6-6 = 12 -> L
4. 1-0 = 1 -> A
5. 10-10 = 20 -> T
6. 12-8 = 20 -> T
7. 4-5 = 9 -> I
8. 2-1 = 3 -> C
9. 3-2 = 5 -> E
10. Stage key is LATTICE.
11. Enter LATTICE and submit.

## 6) Solve Stage 5: The Oracle

1. Click Query Oracle with Header in the UI.
2. The app calls /api/oracle with X-Constellation: draco.
3. Oracle riddle appears: "I begin as ash, then guard a forge. Name me..."
4. The answer is EMBER.
5. Enter EMBER and submit.

## 7) Unlock the final flag

1. Keep all five stage inputs in order:
2. MIRROR, PRISM, ORBIT, LATTICE, EMBER
3. Click Validate Full Sequence.
4. Final result:
5. CTF{MIRROR_PRISM_ORBIT_LATTICE_EMBER}

## 8) Notes for challenge author

1. No challenge can be guaranteed "not solvable by AI".
2. This design is AI-resistant by requiring mixed reasoning, UI observation, encoding, and crafted request flow.
3. To make it harder, rotate stage 4 logic and oracle riddle periodically.
