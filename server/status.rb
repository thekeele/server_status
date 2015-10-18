#!/usr/bin/env ruby

puts `uptime --pretty`
puts `last reboot -F | head -1 | awk '{print $5,$6,$7,$8,$9}'`

cpu = `sar -u 1 3`
mem = `sar -r 1 3`
io = `sar -b 1 3`

stats = [cpu,mem,io]

stats.each do |stat|
  stat = stat.to_s
  stat_cat = stat.lines[2]
  stat_avg = stat.lines.last
  puts "#{stat_cat}#{stat_avg}"
end

puts `service nginx status`
puts `service blog status`
puts `service lux status`

fail_status = `sudo fail2ban-client status`
fail_status = fail_status.to_s
fail_jails = fail_status.lines.last.split(',')
fail_jails[0] = fail_jails[0].split(' ').last

fail_jails.each do |jail|
  jail = jail.chomp
  status = `sudo fail2ban-client status #{jail}`
  cur_ban = status.lines[6].chomp
  total_ban = status.lines[8].chomp
  total_fail = status.lines[4].chomp
  puts "#{jail}#{cur_ban}#{total_ban}#{total_fail}"
end
