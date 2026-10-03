program mandel
    implicit none
    integer, parameter :: N = 99  ! smaller than half of terminal width
    character(3) :: N_str
    complex :: c(N,N)  ! coordinates
    complex :: z(N,N)  ! values for iteration
    integer :: i, j
    c = 0.0
    z = 0.0
    do i = 1, N
        c(:, i) = c(:, i) + [(cmplx(3.*j/(N-1)-2, 0.),j=0,N-1)]
        c(i, :) = c(i, :) + [(cmplx(0., 3.*j/(N-1)-1.5),j=0,N-1)]
    end do
    do i = 1, 100
        z = z**2 + c
    end do
    write(N_str, "(i3)") N
    print "("//trim(N_str)//"(a))", merge('##', '  ', abs(z)<2)
end program mandel

! From https://fortran-lang.discourse.group/t/modern-fortran-sample-code/2019/14
