with Ada.Text_IO;
with Ada.Integer_Text_IO;

procedure Fizz_Buzz is
begin
   for I in 1 .. 100 loop
      if I mod 15 = 0 then
         Ada.Text_IO.Put_Line ("fizz buzz");
      elsif I mod 5 = 0 then
         Ada.Text_IO.Put_Line ("buzz");
      elsif I mod 3 = 0 then
         Ada.Text_IO.Put_Line ("fizz");
      else
         Ada.Integer_Text_IO.Put (I, Width => 0);
         Ada.Text_IO.New_Line;
      end if;
   end loop;
end Fizz_Buzz;

--  From https://github.com/kylelk/ada-examples/blob/master/fizz_buzz.adb
