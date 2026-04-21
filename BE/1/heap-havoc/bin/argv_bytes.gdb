break *0x1400018d0
run
set $argv = *(char***)($rbp+0x18)
set $a1 = *($argv+1)
set $a2 = *($argv+2)
printf "argv1 ptr=%p argv2 ptr=%p\n", $a1, $a2
x/96bx $a1
x/16bx $a2
quit
