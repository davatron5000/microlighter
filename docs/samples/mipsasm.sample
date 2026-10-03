.text
.global AckermannFunc

# Preconditions:
#   1st parameter ($a0) m
#   2nd parameter ($a1) n
# Postconditions:
#   result in ($v0) = value of A(m,n)

AckermannFunc:
            addi    $sp,   $sp, -8
            sw      $s0, 4($sp)
            sw      $ra, 0($sp)

            # move the parameter registers to temporary  - no, only when nec.

LABEL_IF:   bne     $a0, $zero, LABEL_ELSE_IF

            addi    $v0, $a1, 1

            # jump to LABEL_DONE
            j LABEL_DONE

# From https://github.com/highlightjs/highlight.js/blob/81e450f3eba5c3e9112a249ae85b696371d738f9/test/markup/mipsasm/default.txt
