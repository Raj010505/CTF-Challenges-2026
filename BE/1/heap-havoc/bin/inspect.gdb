break *0x1400018d0
run AAA BBB
set $i1 = *(void**)($rbp-0x10)
set $i2 = *(void**)($rbp-0x18)
set $n1 = *(void**)($i1+8)
set $n2 = *(void**)($i2+8)
printf "i1=%p i2=%p n1=%p n2=%p\n", $i1, $i2, $n1, $n2
printf "off_n1_to_i2=%lld\n", (long long)$i2-(long long)$n1
printf "off_n1_to_i2cookie=%lld\n", (long long)$i2+16-(long long)$n1
printf "off_n1_to_i2cb=%lld\n", (long long)$i2+24-(long long)$n1
x/32gx $n1
quit
